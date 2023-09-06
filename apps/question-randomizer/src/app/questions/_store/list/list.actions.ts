import { createAction, props } from '@ngrx/store';
import { QuestionCreateRequest } from '../../_models/backend/question-create-request.model';
import { Question } from '../../_models/frontend/question.model';
import { QuestionCsvListItem } from '../../_models/frontend/question-csv-list-item.model';

// Load

export const loadQuestionList = createAction('[Questions] Load Question List');

export const loadQuestionListSuccess = createAction(
  '[Questions] Load Question List Success',
  props<{ entities: Question[] }>()
);

export const loadQuestionListError = createAction(
  '[Questions] Load Question List Error',
  props<{ error: string }>()
);

// Create

export const createQuestion = createAction(
  '[Questions] Create Question',
  props<{ entity: QuestionCreateRequest }>()
);

export const createQuestionSuccess = createAction(
  '[Questions] Create Question Success',
  props<{ entity: Question }>()
);

export const createQuestionError = createAction(
  '[Questions] Create Question Error',
  props<{ error: string }>()
);

// Update

export const updateQuestion = createAction(
  '[Questions] Update Question',
  props<{ entity: Question }>()
);

export const updateQuestionSuccess = createAction(
  '[Questions] Update Question Success',
  props<{ id: string; changes: Partial<Question> }>()
);

export const updateQuestionError = createAction(
  '[Questions] Update Question Error',
  props<{ error: string }>()
);

// Delete

export const deleteQuestion = createAction(
  '[Questions] Delete Question',
  props<{ id: string }>()
);

export const deleteQuestionSuccess = createAction(
  '[Questions] Delete Question Success',
  props<{ id: string }>()
);

export const deleteQuestionError = createAction(
  '[Questions] Delete Question Error',
  props<{ error: string }>()
);

// Export

export const exportQuestionList = createAction(
  '[Questions] Export Question List'
);

// Import

export const importQuestionList = createAction(
  '[Questions] Import Question List',
  props<{ entities: QuestionCsvListItem[] }>()
);

export const importQuestionListSuccess = createAction(
  '[Questions] Import Question List Success'
);

export const importQuestionListError = createAction(
  '[Questions] Import Question List Error',
  props<{ error: string }>()
);
