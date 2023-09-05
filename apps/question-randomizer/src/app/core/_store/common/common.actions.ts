import { createAction, props } from '@ngrx/store';

export const changeDialogVisibility = createAction(
  '[App] Show Dialog',
  props<{ isDialogVisible: boolean }>()
);

export const handleError = createAction(
  '[App] Handle Error',
  props<{ err: any }>()
);

export const empty = createAction('[App] Empty');
