import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ImageService, RecipeImage } from './image.service';
import { AddRecipeImages } from './image.actions';

export interface ImageStateModel {
  images: RecipeImage[];
  loading: boolean;
}

@State<ImageStateModel>({
  name: 'image',
  defaults: {
    images: [],
    loading: false
  }
})
@Injectable()
export class ImageState {
  constructor(private imageService: ImageService) {}

  @Selector()
  static images(state: ImageStateModel) {
    return state.images;
  }

  @Selector()
  static loading(state: ImageStateModel) {
    return state.loading;
  }

  @Action(AddRecipeImages)
  addRecipeImages(ctx: StateContext<ImageStateModel>, action: AddRecipeImages) {
    ctx.patchState({ loading: true });
    return this.imageService.addImages(action.recipeId, action.images).pipe(
      tap((results) => {
        console.log('Images added:', results);
        ctx.patchState({ loading: false });
      })
    );
  }
}
