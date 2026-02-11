import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ShowToast, ClearToasts } from './toast.actions';

export interface ToastMessage {
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
  life: number;
}

export interface ToastStateModel {
  messages: ToastMessage[];
}

@State<ToastStateModel>({
  name: 'toast',
  defaults: {
    messages: []
  }
})
@Injectable()
export class ToastState {

  @Selector()
  static messages(state: ToastStateModel) {
    return state.messages;
  }

  @Action(ShowToast)
  showToast(ctx: StateContext<ToastStateModel>, action: ShowToast) {
    const msg: ToastMessage = {
      severity: action.severity,
      summary: action.summary,
      detail: action.detail,
      life: action.life
    };
    ctx.patchState({ messages: [...ctx.getState().messages, msg] });
  }

  @Action(ClearToasts)
  clearToasts(ctx: StateContext<ToastStateModel>) {
    ctx.patchState({ messages: [] });
  }
}
