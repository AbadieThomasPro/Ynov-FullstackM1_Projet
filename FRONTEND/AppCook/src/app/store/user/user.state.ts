import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserService, User } from './user.service';
import { 
  Login, 
  Register, 
  Logout, 
  GetCurrentUser, 
  GetAllUsers, 
  GetUserById, 
  UpdateUser, 
  DeleteUser 
} from './user.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface UserStateModel {
  accessToken: string | null;
  currentUser: User | null;
  users: User[];
  selectedUser: User | null;
  isAuthenticated: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    accessToken: localStorage.getItem('accessToken'),
    currentUser: null,
    users: [],
    selectedUser: null,
    isAuthenticated: !!localStorage.getItem('accessToken')
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static accessToken(state: UserStateModel) {
    return state.accessToken;
  }

  @Selector()
  static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static selectedUser(state: UserStateModel) {
    return state.selectedUser;
  }

  @Selector()
  static isAuthenticated(state: UserStateModel) {
    return state.isAuthenticated;
  }

  @Action(Login)
  login(ctx: StateContext<UserStateModel>, action: Login) {
    return this.userService.login(action.payload.email, action.payload.password).pipe(
      tap((res) => {
        console.log('[NGXS] Login response:', res);
        ctx.patchState({ 
          accessToken: res.accessToken, 
          isAuthenticated: true 
        });
        // Store token in localStorage
        localStorage.setItem('accessToken', res.accessToken);
        // if backend returned userid, fetch full user profile
        if ((res as any).userid) {
          ctx.dispatch(new GetUserById((res as any).userid));
        }
      }),
      catchError(err => {
        console.error('[NGXS] Login error:', err);
        ctx.patchState({ accessToken: null, isAuthenticated: false });
        return of(err);
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<UserStateModel>, action: Register) {
    return this.userService.register(action.payload.email, action.payload.password, action.payload.pseudo).pipe(
      tap((res) => {
        console.log('[NGXS] Register response:', res);
        ctx.patchState({ 
          accessToken: res.accessToken, 
          isAuthenticated: true 
        });
        // Store token in localStorage
        localStorage.setItem('accessToken', res.accessToken);
        if ((res as any).userid) {
          ctx.dispatch(new GetUserById((res as any).userid));
        }
      }),
      catchError(err => {
        console.error('[NGXS] Register error:', err);
        ctx.patchState({ accessToken: null, isAuthenticated: false });
        return of(err);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.patchState({ 
      accessToken: null, 
      currentUser: null, 
      isAuthenticated: false 
    });
    localStorage.removeItem('accessToken');
  }

  @Action(GetCurrentUser)
  getCurrentUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getCurrentUser().pipe(
      tap((res) => {
        console.log('[NGXS] GetCurrentUser response:', res);
        ctx.patchState({ currentUser: res });
      }),
      catchError(err => {
        console.error('[NGXS] GetCurrentUser error:', err);
        ctx.patchState({ currentUser: null });
        return of(err);
      })
    );
  }

  @Action(GetAllUsers)
  getAllUsers(ctx: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((res) => {
        console.log('[NGXS] GetAllUsers response:', res);
        ctx.patchState({ users: res });
      }),
      catchError(err => {
        console.error('[NGXS] GetAllUsers error:', err);
        ctx.patchState({ users: [] });
        return of(err);
      })
    );
  }

  @Action(GetUserById)
  getUserById(ctx: StateContext<UserStateModel>, action: GetUserById) {
    return this.userService.getUserById(action.id).pipe(
      tap((res) => {
        console.log('[NGXS] GetUserById response:', res);
        ctx.patchState({ selectedUser: res });
      }),
      catchError(err => {
        console.error('[NGXS] GetUserById error:', err);
        ctx.patchState({ selectedUser: null });
        return of(err);
      })
    );
  }

  @Action(UpdateUser)
  updateUser(ctx: StateContext<UserStateModel>, action: UpdateUser) {
    return this.userService.updateUser(action.id, action.payload).pipe(
      tap((res) => {
        console.log('[NGXS] UpdateUser response:', res);
        // Update current user if it's the same
        const state = ctx.getState();
        if (state.currentUser?.userid === action.id) {
          ctx.patchState({ currentUser: res });
        }
      }),
      catchError(err => {
        console.error('[NGXS] UpdateUser error:', err);
        return of(err);
      })
    );
  }

  @Action(DeleteUser)
  deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
    return this.userService.deleteUser(action.id).pipe(
      tap(() => {
        console.log('[NGXS] DeleteUser success');
        // Remove from users list
        const state = ctx.getState();
        ctx.patchState({ 
          users: state.users.filter(u => u.userid !== action.id) 
        });
      }),
      catchError(err => {
        console.error('[NGXS] DeleteUser error:', err);
        return of(err);
      })
    );
  }
}
