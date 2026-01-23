import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { StepService, RecipeStep } from './step.service';
import { AddRecipeSteps } from './step.actions';

export interface StepStateModel {
  steps: RecipeStep[];
  createdSteps: any[]; // Store the response from adding steps
  loading: boolean;
}

@State<StepStateModel>({
  name: 'step',
  defaults: {
    steps: [],
    createdSteps: [],
    loading: false
  }
})
@Injectable()
export class StepState {
  constructor(private stepService: StepService) {}

  @Selector()
  static steps(state: StepStateModel) {
    return state.steps;
  }

  @Selector()
  static loading(state: StepStateModel) {
    return state.loading;
  }

  @Selector()
  static createdSteps(state: StepStateModel) {
    return state.createdSteps;
  }

  @Action(AddRecipeSteps)
  addRecipeSteps(ctx: StateContext<StepStateModel>, action: AddRecipeSteps) {
    ctx.patchState({ loading: true });
    return this.stepService.addSteps(action.recipeId, action.steps).pipe(
      tap((results) => {
        console.log('Steps added:', results);
        ctx.patchState({ 
          createdSteps: results,
          loading: false 
        });
      })
    );
  }
}
