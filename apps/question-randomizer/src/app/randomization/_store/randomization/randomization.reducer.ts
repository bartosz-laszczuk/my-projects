import { createReducer, on } from '@ngrx/store';
import {
  loadRandomization,
  loadRandomizationError,
  loadRandomizationSuccess,
  resetRandomization,
  resetRandomizationError,
  resetRandomizationSuccess,
  updateQuestionAsCurrent,
  updateQuestionAsCurrentError,
  updateQuestionAsCurrentSuccess,
  updateRandomization,
  updateRandomizationError,
  updateRandomizationSuccess,
} from './randomization.actions';
import { RandomizationStatus } from '../../_enums/randomization-status.enum';
import { Randomization } from '../../_models/frontend/randomization.model';

export class RandomizationState {
  entity: Randomization | null = null;
  isLoading: boolean | null = null;
  error: string | null = null;
}

const initialState: RandomizationState = {
  entity: null,
  isLoading: null,
  error: null,
};

export const randomizationReducer = createReducer(
  initialState,
  // Load
  on(loadRandomization, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loadRandomizationSuccess, (state, { entity }) => ({
    ...state,
    entity,
    isLoading: false,
    error: null,
  })),
  on(loadRandomizationError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Update Status
  on(updateRandomization, (state, { entity }) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateRandomizationSuccess, (state, { id, changes }) => ({
    ...state,
    entity: { ...state.entity, id, ...changes } as Randomization,
    isLoading: false,
    error: null,
  })),
  on(updateRandomizationError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Update Question As Current
  on(updateQuestionAsCurrent, (state, { question }) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(updateQuestionAsCurrentSuccess, (state, { randomization }) => ({
    ...state,
    entity: {
      ...randomization,
    } as Randomization,
    isLoading: false,
    error: null,
  })),
  on(updateQuestionAsCurrentError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  // Reset Randomization
  on(resetRandomization, (state, { randomizationId }) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(resetRandomizationSuccess, (state) => ({
    ...state,
    entity: {
      ...state.entity,
      status: RandomizationStatus.Ongoing,
    } as Randomization,
    isLoading: false,
    error: null,
  })),
  on(resetRandomizationError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
