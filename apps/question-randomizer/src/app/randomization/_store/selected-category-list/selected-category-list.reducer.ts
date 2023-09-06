import { createReducer, on } from '@ngrx/store';
import {
  loadSelectedCategoryList,
  loadSelectedCategoryListError,
  loadSelectedCategoryListSuccess,
  updateSelectedCategoryList,
  updateSelectedCategoryListError,
  updateSelectedCategoryListSuccess,
} from './selected-category-list.actions';
import { Category } from '../../_models/frontend/category.model';

export class SelectedCategoryListState {
  entities: Category[] | null = null;
  isLoading: boolean | null = null;
  error: string | null = null;
}

const initialState: SelectedCategoryListState = {
  entities: null,
  isLoading: null,
  error: null,
};

export const selectedCategoryListReducer = createReducer(
  initialState,
  // Load
  on(loadSelectedCategoryList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loadSelectedCategoryListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
    error: null,
  })),
  on(loadSelectedCategoryListError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Update
  on(updateSelectedCategoryList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateSelectedCategoryListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
    error: null,
  })),
  on(updateSelectedCategoryListError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
