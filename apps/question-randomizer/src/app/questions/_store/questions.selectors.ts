import { createFeatureSelector } from '@ngrx/store';
import { QuestionsState } from './questions.reducer';

export const getQuestionsState =
  createFeatureSelector<QuestionsState>('questions');
