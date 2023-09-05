import { createReducer, on } from '@ngrx/store';
import { changeDialogVisibility } from './common.actions';

export interface CommonState {
  isDialogVisible: boolean;
}

export const initialState: CommonState = { isDialogVisible: false };

export const commonReducer = createReducer(
  initialState,
  on(changeDialogVisibility, (state, { isDialogVisible }) => ({
    ...state,
    isDialogVisible,
  }))
);
