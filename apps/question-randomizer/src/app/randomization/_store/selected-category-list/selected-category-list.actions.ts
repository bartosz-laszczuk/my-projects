import { createAction, props } from '@ngrx/store';
import { Category } from '../../_models/frontend/category.model';

// Load

export const loadSelectedCategoryList = createAction(
  '[Randomization] Load Selected Category List',
  props<{ randomizationId: string }>()
);

export const loadSelectedCategoryListSuccess = createAction(
  '[Randomization] Load Selected Category List Success',
  props<{ entities: Category[] }>()
);

export const loadSelectedCategoryListError = createAction(
  '[Randomization] Load Selected Category List Error',
  props<{ error: string }>()
);

// Update

export const updateSelectedCategoryList = createAction(
  '[Randomization] Update Selected Category List',
  props<{ ids: string[] }>()
);

export const updateSelectedCategoryListSuccess = createAction(
  '[Randomization] Update Selected Category List Success',
  props<{ entities: Category[] }>()
);

export const updateSelectedCategoryListError = createAction(
  '[Randomization] Update Selected Category List Error',
  props<{ error: string }>()
);
