export class AddRecipeSteps {
  static readonly type = '[Step] Add Recipe Steps';
  constructor(public recipeId: string, public steps: any[]) {}
}
