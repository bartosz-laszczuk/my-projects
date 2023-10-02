import { createReducer, on } from '@ngrx/store';
import {
  createQuestion,
  createQuestionError,
  createQuestionSuccess,
  deleteQuestion,
  deleteQuestionError,
  deleteQuestionSuccess,
  importQuestionList,
  importQuestionListError,
  importQuestionListSuccess,
  loadQuestionList,
  loadQuestionListError,
  loadQuestionListSuccess,
  updateQuestion,
  updateQuestionError,
  updateQuestionSuccess,
} from './list.actions';
import { Question } from '../../_models/backend/question.model';

export interface ListState {
  entities: Question[];
  isLoading: boolean | null;
  error: string | null;
}

export const initialState: ListState = {
  entities: [],
  isLoading: null,
  error: null,
};

export const listReducer = createReducer(
  initialState,
  on(loadQuestionList, (state) => ({ ...state, isLoading: true, error: null })),
  on(loadQuestionListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
    error: null,
  })),
  on(loadQuestionListError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(importQuestionList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(importQuestionListSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(importQuestionListError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(createQuestion, (state) => ({ ...state, isLoading: true, error: null })),
  on(createQuestionSuccess, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(createQuestionError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(updateQuestion, (state) => ({ ...state, isLoading: true, error: null })),
  on(updateQuestionSuccess, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateQuestionError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(deleteQuestion, (state) => ({ ...state, isLoading: true, error: null })),
  on(deleteQuestionSuccess, (state, { id }) => ({
    ...state,
    entities: state.entities!.filter((entity) => entity.id !== id),
    isLoading: false,
    error: null,
  })),
  on(deleteQuestionError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
