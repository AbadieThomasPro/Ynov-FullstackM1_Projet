export class GetAllIngredients {
  static readonly type = '[Ingredient] Get All';
}

export class GetIngredientById {
  static readonly type = '[Ingredient] Get By Id';
  constructor(public id: string) {}
}

export class CreateIngredient {
  static readonly type = '[Ingredient] Create';
  constructor(public payload: any) {}
}

export class UpdateIngredient {
  static readonly type = '[Ingredient] Update';
  constructor(public id: string, public payload: any) {}
}

export class DeleteIngredient {
  static readonly type = '[Ingredient] Delete';
  constructor(public id: string) {}
}
