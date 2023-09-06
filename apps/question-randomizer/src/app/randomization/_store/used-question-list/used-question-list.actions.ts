import { createAction, props } from '@ngrx/store';
import { UsedQuestion } from '../../_models/backend/used-question/used-question.model';

export const loadUsedQuestionList = createAction(
  '[Randomization] Load Used Question List',
  props<{ randomizationId: string }>()
);

export const loadUsedQuestionListSuccess = createAction(
  '[Randomization] Load Used Question List Success',
  props<{ entities: UsedQuestion[] }>()
);

export const loadUsedQuestionListError = createAction(
  '[Randomization] Load Used Question List Error',
  props<{ error: string }>()
);

// Add Question To Used Questions

export const addQuestionToUsedQuestions = createAction(
  '[Randomization] Add Question To Used Questions',
  props<{ questionId: string }>()
);

export const addQuestionToUsedQuestionsSuccess = createAction(
  '[Randomization] Add Question To Used Questions Success',
  props<{ usedQuestion: UsedQuestion }>()
);

export const addQuestionToUsedQuestionsError = createAction(
  '[Randomization] Add Question To Used Questions Error',
  props<{ error: string }>()
);

// Delete Question From Used Qestions

export const deleteQuestionFromUsedQuestions = createAction(
  '[Randomization] Delete Question From Used Questions',
  props<{ questionId: string }>()
);

export const deleteQuestionFromUsedQuestionsSuccess = createAction(
  '[Randomization] Delete Question From Used Questions Success',
  props<{ questionId: string }>()
);

export const deleteQuestionFromUsedQuestionsError = createAction(
  '[Randomization] Delete Question From Used Questions Error',
  props<{ error: string }>()
);
