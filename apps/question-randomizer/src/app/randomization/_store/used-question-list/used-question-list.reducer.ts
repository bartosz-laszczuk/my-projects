import { createReducer, on } from '@ngrx/store';
import {
  resetRandomizationSuccess,
  updateQuestionAsCurrentSuccess,
} from '../randomization/randomization.actions';
import {
  addQuestionToUsedQuestions,
  addQuestionToUsedQuestionsError,
  addQuestionToUsedQuestionsSuccess,
  deleteQuestionFromUsedQuestions,
  deleteQuestionFromUsedQuestionsError,
  deleteQuestionFromUsedQuestionsSuccess,
  loadUsedQuestionList,
  loadUsedQuestionListError,
  loadUsedQuestionListSuccess,
} from './used-question-list.actions';
import { UsedQuestion } from '../../_models/backend/used-question/used-question.model';

export class UsedQuestionListState {
  entities: UsedQuestion[] | null = null;
  isLoading: boolean | null = null;
  error: string | null = null;
}

const initialState: UsedQuestionListState = {
  entities: null,
  isLoading: null,
  error: null,
};

export const usedQuestionListReducer = createReducer(
  initialState,
  // Load
  on(loadUsedQuestionList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loadUsedQuestionListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
    error: null,
  })),
  on(loadUsedQuestionListError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Add Question To Used Questions
  on(addQuestionToUsedQuestions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(addQuestionToUsedQuestionsSuccess, (state, { usedQuestion }) => ({
    ...state,
    entities: [...state.entities!, usedQuestion],
    isLoading: false,
    error: null,
  })),
  on(addQuestionToUsedQuestionsError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Delete Question From Used Questions
  on(deleteQuestionFromUsedQuestions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(deleteQuestionFromUsedQuestionsSuccess, (state, { questionId }) => ({
    ...state,
    entities: state.entities!.filter(
      (entity) => entity.questionId !== questionId
    ),
    isLoading: false,
    error: null,
  })),
  on(deleteQuestionFromUsedQuestionsError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Update Question As Current
  on(updateQuestionAsCurrentSuccess, (state, { randomization }) => ({
    ...state,
    entities:
      state.entities?.filter(
        (entity) => entity.questionId !== randomization.currentQuestion!.id
      ) ?? null,
  })),
  // Reset Randomization
  on(resetRandomizationSuccess, (state) => ({
    ...state,
    entities: [],
    isLoading: false,
    error: null,
  }))
);
