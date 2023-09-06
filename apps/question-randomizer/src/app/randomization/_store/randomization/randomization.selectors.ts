import { createSelector } from '@ngrx/store';
import { getRandomizationState as getGlobalRandomizationState } from '../randomization.selectors';

export const getRandomizationState = createSelector(
  getGlobalRandomizationState,
  (state) => state.randomization
);

export const getRandomization = createSelector(
  getRandomizationState,
  (state) => state.entity
);
