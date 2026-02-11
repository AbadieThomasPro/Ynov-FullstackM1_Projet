export class ShowToast {
  static readonly type = '[Toast] Show';
  constructor(
    public severity: 'success' | 'info' | 'warn' | 'error',
    public summary: string,
    public detail: string = '',
    public life: number = 3000
  ) {}
}

export class ClearToasts {
  static readonly type = '[Toast] Clear';
}
