import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { IngredientService, Ingredient } from './ingredient.service';
import { GetAllIngredients, GetIngredientById, CreateIngredient, UpdateIngredient, DeleteIngredient } from './ingredient.actions';
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

  @Action(CreateIngredient)
  create(ctx: StateContext<IngredientStateModel>, action: CreateIngredient) {
    return this.ingredientService.create(action.payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.patchState({ ingredients: [res, ...state.ingredients] });
      }),
      catchError(err => { console.error('[NGXS] CreateIngredient error', err); return of(err); })
    );
  }

  @Action(UpdateIngredient)
  update(ctx: StateContext<IngredientStateModel>, action: UpdateIngredient) {
    return this.ingredientService.update(action.id, action.payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.patchState({ ingredients: state.ingredients.map(i => i.ingredientid === action.id ? res : i) });
        if (state.selectedIngredient?.ingredientid === action.id) {
          ctx.patchState({ selectedIngredient: res });
        }
      }),
      catchError(err => { console.error('[NGXS] UpdateIngredient error', err); return of(err); })
    );
  }

  @Action(DeleteIngredient)
  delete(ctx: StateContext<IngredientStateModel>, action: DeleteIngredient) {
    return this.ingredientService.delete(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({ ingredients: state.ingredients.filter(i => i.ingredientid !== action.id) });
      }),
      catchError(err => { console.error('[NGXS] DeleteIngredient error', err); return of(err); })
    );
  }
}
