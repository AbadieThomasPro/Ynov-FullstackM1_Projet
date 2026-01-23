export class GetAllIngredients {
  static readonly type = '[Ingredient] Get All';
}

export class GetIngredientById {
  static readonly type = '[Ingredient] Get By Id';
  constructor(public id: string) {}
}
