import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.reducer';

export const getCommonState = createFeatureSelector<CommonState>('common');

export const getIsDialogVisible = createSelector(
  getCommonState,
  (state) => state.isDialogVisible
);
