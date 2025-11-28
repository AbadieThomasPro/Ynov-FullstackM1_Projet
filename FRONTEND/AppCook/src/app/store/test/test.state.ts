import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { TestService } from './test.service';
import { GetTest } from './test.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface TestStateModel {
  message: string | null;
}

@State<TestStateModel>({
  name: 'test',
  defaults: {
    message: null
  }
})
@Injectable()
export class TestState {
  constructor(private testService: TestService) {}

  @Selector()
  static message(state: TestStateModel) {
    return state.message;
  }
  @Action(GetTest)
  loadTest(ctx: StateContext<TestStateModel>) {
    // Appel du service et patch du state avec la réponse
    return this.testService.test().pipe(
      tap((res: string) => {
        // debug log to ensure the service returned the expected string
        console.log('[NGXS] loadTest response:', res);
        ctx.patchState({ message: res });
      }),
      catchError(err => {
        // En cas d'erreur, on reset le message 
        ctx.patchState({ message: null });
        // on renvoie une observable pour compléter le flux NGXS
        return of(err);
      })
    );
  }
}