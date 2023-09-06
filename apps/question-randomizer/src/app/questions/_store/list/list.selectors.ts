import { createSelector } from '@ngrx/store';
import { getQuestionsState } from '../questions.selectors';

export const getQuestionListState = createSelector(
  getQuestionsState,
  (state) => state.list
);

export const getQuestionList = createSelector(
  getQuestionListState,
  (state) => state.entities
);
