import { createFeatureSelector } from '@ngrx/store';
import { RandomizationState } from './randomization.reducer';

export const getRandomizationState =
  createFeatureSelector<RandomizationState>('randomization');
