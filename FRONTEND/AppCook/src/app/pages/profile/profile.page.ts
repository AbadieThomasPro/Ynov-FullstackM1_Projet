import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { Observable } from 'rxjs';
import { GetUserById } from '../../store/user/user.actions';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  user$!: Observable<any>;

  constructor(private store: Store) {
    this.user$ = this.store.select(UserState.selectedUser);
  }

  ngOnInit() {
    const current = this.store.selectSnapshot(UserState.currentUser);
    if (current?.userid) {
      this.store.dispatch(new GetUserById(current.userid));
    }
  }
}
