import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesState } from './dictionaries.reducer';

export const getDictionariesState =
  createFeatureSelector<DictionariesState>('dictionaries');

export const getDictionaries = createSelector(
  getDictionariesState,
  (state) => state.entities
);

export const getIsLoading = createSelector(
  getDictionariesState,
  (state) => state.isLoading
);

export const getIsLoaded = createSelector(
  getDictionariesState,
  (state) => state.entities && !state.isLoading
);

export const getRoles = createSelector(
  getDictionaries,
  (entities) => entities.roles
);

export const getQualifications = createSelector(
  getDictionaries,
  (entities) => entities.qualifications
);

export const getSkills = createSelector(
  getDictionaries,
  (entities) => entities.skills
);

export const getSpecializations = createSelector(
  getDictionaries,
  (entities) => entities.specializations
);

export const getCategories = createSelector(
  getDictionaries,
  (entities) => entities.categories
);
