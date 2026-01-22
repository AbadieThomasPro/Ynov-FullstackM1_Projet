import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { RecipeService, Recipe } from './recipe.service';
import { GetAllRecipes, GetRecipeById, CreateRecipe, UpdateRecipe, DeleteRecipe } from './recipe.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface RecipeStateModel {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
}

@State<RecipeStateModel>({
  name: 'recipe',
  defaults: {
    recipes: [],
    selectedRecipe: null
  }
})
@Injectable()
export class RecipeState {
  constructor(private recipeService: RecipeService) {}

  @Selector()
  static recipes(state: RecipeStateModel) {
    return state.recipes;
  }

  @Selector()
  static selectedRecipe(state: RecipeStateModel) {
    return state.selectedRecipe;
  }

  @Action(GetAllRecipes)
  getAll(ctx: StateContext<RecipeStateModel>) {
    return this.recipeService.getAll().pipe(
      tap((res) => ctx.patchState({ recipes: res })),
      catchError(err => { console.error('[NGXS] GetAllRecipes error', err); ctx.patchState({ recipes: [] }); return of(err); })
    );
  }

  @Action(GetRecipeById)
  getById(ctx: StateContext<RecipeStateModel>, action: GetRecipeById) {
    return this.recipeService.getById(action.id).pipe(
      tap((res) => ctx.patchState({ selectedRecipe: res })),
      catchError(err => { console.error('[NGXS] GetRecipeById error', err); ctx.patchState({ selectedRecipe: null }); return of(err); })
    );
  }

  @Action(CreateRecipe)
  create(ctx: StateContext<RecipeStateModel>, action: CreateRecipe) {
    return this.recipeService.create(action.payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.patchState({ recipes: [res, ...state.recipes] });
      }),
      catchError(err => { console.error('[NGXS] CreateRecipe error', err); return of(err); })
    );
  }

  @Action(UpdateRecipe)
  update(ctx: StateContext<RecipeStateModel>, action: UpdateRecipe) {
    return this.recipeService.update(action.id, action.payload).pipe(
      tap((res) => {
        const state = ctx.getState();
        ctx.patchState({ recipes: state.recipes.map(r => r.recipeid === action.id ? res : r) });
        if (state.selectedRecipe?.recipeid === action.id) {
          ctx.patchState({ selectedRecipe: res });
        }
      }),
      catchError(err => { console.error('[NGXS] UpdateRecipe error', err); return of(err); })
    );
  }

  @Action(DeleteRecipe)
  delete(ctx: StateContext<RecipeStateModel>, action: DeleteRecipe) {
    return this.recipeService.delete(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({ recipes: state.recipes.filter(r => r.recipeid !== action.id) });
      }),
      catchError(err => { console.error('[NGXS] DeleteRecipe error', err); return of(err); })
    );
  }
}
