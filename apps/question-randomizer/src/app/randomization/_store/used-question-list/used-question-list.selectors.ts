import { createSelector } from '@ngrx/store';
import { getRandomizationState } from '../randomization.selectors';

export const getUsedQuestionListState = createSelector(
  getRandomizationState,
  (state) => state.usedQuestionList
);

export const getUsedQuestionList = createSelector(
  getUsedQuestionListState,
  (state) => state.entities
);
