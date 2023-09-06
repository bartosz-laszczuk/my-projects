import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { serverTimestamp } from 'firebase/firestore';
import { catchError, map, of, switchMap, take, withLatestFrom } from 'rxjs';
import {
  loadRandomizationSuccess,
  updateQuestionAsCurrentSuccess,
} from '../randomization/randomization.actions';
import { RandomizationFacade } from '../randomization/randomization.facade';
import {
  addQuestionToUsedQuestions,
  addQuestionToUsedQuestionsError,
  addQuestionToUsedQuestionsSuccess,
  deleteQuestionFromUsedQuestions,
  deleteQuestionFromUsedQuestionsError,
  deleteQuestionFromUsedQuestionsSuccess,
  loadUsedQuestionList,
  loadUsedQuestionListError,
  loadUsedQuestionListSuccess,
} from './used-question-list.actions';
import { UsedQuestionListService } from '../../_services/used-question/used-question-list.service';
import { UsedQuestionCreateRequest } from '../../_models/backend/used-question/used-question-create-request.model';
import { UsedQuestion } from '../../_models/backend/used-question/used-question.model';

@Injectable()
export class UsedQuestionListEffects {
  constructor(
    private _actions$: Actions,
    private _usedQuestionListService: UsedQuestionListService,
    private _randomizationFacade: RandomizationFacade
  ) {}

  loadUsedQuestionList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUsedQuestionList),
      map((action) => action.randomizationId),
      switchMap((randomizationId) =>
        this._usedQuestionListService
          .loadUsedQuestionList(randomizationId)
          .pipe(
            map((entities) => loadUsedQuestionListSuccess({ entities })),
            catchError((err) =>
              of(loadUsedQuestionListError({ error: err.message }))
            )
          )
      )
    )
  );

  loadRandomizationSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRandomizationSuccess),
      map((action) => action.entity.id),
      map((randomizationId) => loadUsedQuestionList({ randomizationId }))
    )
  );

  addQuestionToUsedQuestions = createEffect(() =>
    this._actions$.pipe(
      ofType(addQuestionToUsedQuestions),
      map((action) => action.questionId),
      withLatestFrom(this._randomizationFacade.randomizationLoaded$),
      map(
        ([questionId, randomization]) =>
          ({
            questionId,
            randomizationId: randomization.id,
            created: serverTimestamp(),
          } as UsedQuestionCreateRequest)
      ),
      switchMap((request) =>
        this._usedQuestionListService.addQuestionToUsedQuestions(request).pipe(
          switchMap((id) => this._usedQuestionListService.loadUsedQuestion(id)),
          map((usedQuestion) =>
            addQuestionToUsedQuestionsSuccess({ usedQuestion })
          ),
          catchError((err) =>
            of(addQuestionToUsedQuestionsError({ error: err.message }))
          )
        )
      )
    )
  );

  deleteQuestionFromUsedQuestions = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteQuestionFromUsedQuestions),
      map((action) => action.questionId),
      withLatestFrom(this._randomizationFacade.randomizationLoaded$),
      map(
        ([questionId, randomization]) =>
          ({ questionId, randomizationId: randomization.id } as UsedQuestion)
      ),
      switchMap((usedQuestion) =>
        this._usedQuestionListService
          .deleteQuestionFromUsedQuestions(
            usedQuestion.questionId,
            usedQuestion.randomizationId
          )
          .pipe(
            map(() =>
              deleteQuestionFromUsedQuestionsSuccess({
                questionId: usedQuestion.questionId,
              })
            ),
            catchError((err) =>
              of(deleteQuestionFromUsedQuestionsError({ error: err.message }))
            )
          )
      )
    )
  );

  updateQuestionAsCurrentSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateQuestionAsCurrentSuccess),
      switchMap(() =>
        this._randomizationFacade.randomizationLoaded$.pipe(take(1))
      ),
      map((randomization) =>
        loadUsedQuestionList({ randomizationId: randomization.id })
      )
    )
  );
}
