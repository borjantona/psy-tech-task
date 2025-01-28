import { createAction, props } from '@ngrx/store';

export enum EAlertActions {
  ALERT_TOAST_SHOW = '[Alert] Show Toast',
  ALERT_TOAST_CLOSE = '[Alert] Close Toast',
}

export const toastShow = createAction(
  EAlertActions.ALERT_TOAST_SHOW,
  props<{ message: string }>()
);
export const toastClose = createAction(
  EAlertActions.ALERT_TOAST_CLOSE,
);
