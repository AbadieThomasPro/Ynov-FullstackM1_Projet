export class AddRecipeImages {
  static readonly type = '[Image] Add Recipe Images';
  constructor(public recipeId: string, public images: any[]) {}
}
