import { createAction, props } from '@ngrx/store';
import { Dictionaries } from '../../_models/frontend/dictionaries.model';

export const loadDictionaries = createAction('[App] Load Dictionaries');

export const loadDictionariesSuccess = createAction(
  '[App] Load Dictionaries Success',
  props<{ entities: Dictionaries }>()
);

export const loadDictionariesError = createAction(
  '[App] Load Dictionaries Error',
  props<{ error: string }>()
);
