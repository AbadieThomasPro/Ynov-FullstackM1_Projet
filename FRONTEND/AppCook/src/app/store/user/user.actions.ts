// Auth actions
export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string; password: string }) {}
}

export class Register {
    static readonly type = '[Auth] Register';
    constructor(public payload: { email: string; password: string; pseudo: string }) {}
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

// User actions
export class GetCurrentUser {
    static readonly type = '[User] Get Current';
}

export class GetAllUsers {
    static readonly type = '[User] Get All';
}

export class GetUserById {
    static readonly type = '[User] Get By Id';
    constructor(public id: string) {}
}

export class UpdateUser {
    static readonly type = '[User] Update';
    constructor(public id: string, public payload: { email?: string; pseudo?: string; avatarurl?: string; bio?: string }) {}
}

export class DeleteUser {
    static readonly type = '[User] Delete';
    constructor(public id: string) {}
}
