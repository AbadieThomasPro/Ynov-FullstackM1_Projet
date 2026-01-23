import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IngredientService, Ingredient } from './ingredient.service';
import { GetAllIngredients, GetIngredientById } from './ingredient.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface IngredientStateModel {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient | null;
}

@State<IngredientStateModel>({
  name: 'ingredient',
  defaults: {
    ingredients: [],
    selectedIngredient: null
  }
})
@Injectable()
export class IngredientState {
  constructor(private ingredientService: IngredientService) {}

  @Selector()
  static ingredients(state: IngredientStateModel) {
    return state.ingredients;
  }

  @Selector()
  static selectedIngredient(state: IngredientStateModel) {
    return state.selectedIngredient;
  }

  @Action(GetAllIngredients)
  getAll(ctx: StateContext<IngredientStateModel>) {
    return this.ingredientService.getAll().pipe(
      tap((res) => ctx.patchState({ ingredients: res })),
      catchError(err => { console.error('[NGXS] GetAllIngredients error', err); ctx.patchState({ ingredients: [] }); return of(err); })
    );
  }

  @Action(GetIngredientById)
  getById(ctx: StateContext<IngredientStateModel>, action: GetIngredientById) {
    return this.ingredientService.getById(action.id).pipe(
      tap((res) => ctx.patchState({ selectedIngredient: res })),
      catchError(err => { console.error('[NGXS] GetIngredientById error', err); ctx.patchState({ selectedIngredient: null }); return of(err); })
    );
  }
}
