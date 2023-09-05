import { Dictionaries } from '@my-projects-nx/question-randomizer/shared/util/models/frontend';
import { createAction, props } from '@ngrx/store';

export const loadDictionaries = createAction('[App] Load Dictionaries');

export const loadDictionariesSuccess = createAction(
  '[App] Load Dictionaries Success',
  props<{ entities: Dictionaries }>()
);

export const loadDictionariesError = createAction(
  '[App] Load Dictionaries Error',
  props<{ error: string }>()
);
