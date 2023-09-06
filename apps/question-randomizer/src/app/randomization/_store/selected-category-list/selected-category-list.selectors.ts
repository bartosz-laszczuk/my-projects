import { createSelector } from '@ngrx/store';
import { getRandomizationState } from '../randomization.selectors';

export const getSelectedCategoryListState = createSelector(
  getRandomizationState,
  (state) => state.selectedCategoryList
);

export const getSelectedCategoryList = createSelector(
  getSelectedCategoryListState,
  (state) => state.entities
);
