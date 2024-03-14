import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Question } from '../_models/backend/question.model';
import { inject } from '@angular/core';
import { QuestionListService } from '../_services/question-list.service';
import { firstValueFrom } from 'rxjs';

export interface QuestionsState {
  entities: Question[] | null;
  isLoading: boolean | null;
  error: string | null;
}

export const initialState: QuestionsState = {
  entities: null,
  isLoading: null,
  error: null,
};

export const QuestionsState = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, questionsService = inject(QuestionListService)) => ({
    async loadQuestions() {
      patchState(store, { isLoading: true });

      const questions = await firstValueFrom(
        questionsService.loadQuestionList()
      );

      patchState(store, { entities: questions, isLoading: false });
    },
  }))
);
