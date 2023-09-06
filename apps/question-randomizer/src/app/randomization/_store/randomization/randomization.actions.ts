import { createAction, props } from '@ngrx/store';
import { Randomization } from '../../_models/frontend/randomization.model';
import { Question } from '../../../questions/_models/frontend/question.model';

export const loadRandomization = createAction(
  '[Randomization] Load Randomization',
  props<{ uid: string }>()
);

export const loadRandomizationSuccess = createAction(
  '[Randomization] Load Randomization Success',
  props<{ entity: Randomization }>()
);

export const loadRandomizationNoRandomization = createAction(
  '[Randomization] Load Randomization No Randomization',
  props<{ uid: string }>()
);

export const loadRandomizationError = createAction(
  '[Randomization] Load Randomization Error',
  props<{ error: string }>()
);

// Randomize

export const randomizeQuestion = createAction(
  '[Randomization] Randomize Question'
);

// export const randomizeQuestionSuccess = createAction(
//   '[Randomization] Randomize Question Success',
//   props<{ question: Question }>()
// );

// export const randomizeQuestionError = createAction(
//   '[Randomization] Randomize Question Error',
//   props<{ error: string }>()
// );

// Update

export const updateRandomization = createAction(
  '[Randomization] Update Randomization',
  props<{ entity: Randomization }>()
);

export const updateRandomizationSuccess = createAction(
  '[Randomization] Update Randomization Success',
  props<{ id: string; changes: Partial<Randomization> }>()
);

export const updateRandomizationError = createAction(
  '[Randomization] Update Randomization Error',
  props<{ error: string }>()
);

// Update Question As Current

export const updateQuestionAsCurrent = createAction(
  '[Randomization] Update Question As Current',
  props<{ question: Question }>()
);

export const updateQuestionAsCurrentSuccess = createAction(
  '[Randomization] Update Question As Current Success',
  props<{ randomization: Randomization }>()
);

export const updateQuestionAsCurrentError = createAction(
  '[Randomization] Update Question As Current Error',
  props<{ error: string }>()
);

// Reset Randomization

export const resetRandomization = createAction(
  '[Randomization] Reset Randomization',
  props<{ randomizationId: string }>()
);

export const resetRandomizationSuccess = createAction(
  '[Randomization] Reset Randomization Success'
);

export const resetRandomizationError = createAction(
  '[Randomization] Reset Randomization Error',
  props<{ error: string }>()
);
