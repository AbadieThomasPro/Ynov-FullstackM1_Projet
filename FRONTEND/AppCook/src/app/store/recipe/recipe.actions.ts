// Recipe actions
export class GetAllRecipes {
  static readonly type = '[Recipe] Get All';
}

export class GetRecipeById {
  static readonly type = '[Recipe] Get By Id';
  constructor(public id: string) {}
}

export class CreateRecipe {
  static readonly type = '[Recipe] Create';
  constructor(public payload: any) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipe] Update';
  constructor(public id: string, public payload: any) {}
}

export class DeleteRecipe {
  static readonly type = '[Recipe] Delete';
  constructor(public id: string) {}
}
