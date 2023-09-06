import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { serverTimestamp } from 'firebase/firestore';
import {
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { combineLatestWith, take } from 'rxjs/operators';
import { updateSelectedCategoryListSuccess } from '../selected-category-list/selected-category-list.actions';
import { addQuestionToUsedQuestionsSuccess } from '../used-question-list/used-question-list.actions';
import {
  loadRandomization,
  loadRandomizationError,
  loadRandomizationNoRandomization,
  loadRandomizationSuccess,
  randomizeQuestion,
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
import { RandomizationFacade } from './randomization.facade';
import { RandomizationService } from '../../_services/randomization.service';
import { QuestionsFacade } from '../../../questions/_store/questions.facade';
import { DictionariesFacade } from '../../../core/_store/dictionaries/dictionaries.facade';
import { SelectedCategoryListService } from '../../_services/selected-category-list.service';
import { UsedQuestionListService } from '../../_services/used-question/used-question-list.service';
import { RandomizationMapperService } from '../../_services/randomization-mapper.service';
import { RandomizationStatus } from '../../_enums/randomization-status.enum';
import { RandomizationCreateRequest } from '../../_models/backend/randomization-create-request.model';
import { empty } from '../../../core/_store/common/common.actions';
import { Randomization } from '../../_models/frontend/randomization.model';
@Injectable()
export class RandomizationEffects {
  constructor(
    private _actions$: Actions,
    private _randomizationService: RandomizationService,
    private _randomizationFacade: RandomizationFacade,
    private _questionsFacade: QuestionsFacade,
    private _dictionariesFacade: DictionariesFacade,
    private _selectedCategoryListService: SelectedCategoryListService,
    private _usedQuestionListService: UsedQuestionListService,
    private _mapper: RandomizationMapperService
  ) {}

  loadRandomization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRandomization),
      map((action) => action.uid),
      switchMap((uid) =>
        this._randomizationService.loadRandomization(uid).pipe(
          combineLatestWith(this._questionsFacade.questionListLoaded$),
          take(1),
          map(([entity, questionList]) => {
            if (entity) {
              const randomization = this._mapper.dbRandomizationToRandomization(
                entity,
                questionList
              );
              return loadRandomizationSuccess({ entity: randomization });
            } else {
              return loadRandomizationNoRandomization({ uid });
            }
          }),
          catchError((err) =>
            of(loadRandomizationError({ error: err.message }))
          )
        )
      )
    )
  );

  loadRandomizationNoRandomization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRandomizationNoRandomization),
      map((action) => action.uid),
      switchMap((uid) =>
        this._randomizationService
          .createRandomization({
            uid: uid,
            status: RandomizationStatus.Ongoing,
            isAnswerHidden: true,
            created: serverTimestamp(),
          } as RandomizationCreateRequest)
          .pipe(
            withLatestFrom(this._dictionariesFacade.categoriesLoaded$),
            switchMap(([entity, categories]) =>
              this._selectedCategoryListService
                .updateSelectedCategories(
                  entity.id,
                  categories.map((category) => category.id)
                )
                .pipe(map(() => entity))
            ),
            map((entity) =>
              this._mapper.dbRandomizationToRandomization(entity)
            ),
            map((entity) => loadRandomizationSuccess({ entity })),
            catchError((err) =>
              of(loadRandomizationError({ error: err.message }))
            )
          )
      )
    )
  );

  updateSelectedCategoryListSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateSelectedCategoryListSuccess),
      map((action) => action.entities),
      withLatestFrom(this._randomizationFacade.randomizationLoaded$),
      map(([categories, randomization]) => {
        const question = randomization.currentQuestion;
        if (
          question &&
          categories.some((category) => category.id === question.categoryId)
        ) {
          return empty();
        } else {
          return randomizeQuestion();
        }
      })
    )
  );

  randomizeQuestion$ = createEffect(() =>
    this._actions$.pipe(
      ofType(randomizeQuestion, addQuestionToUsedQuestionsSuccess),
      switchMap(() =>
        this._randomizationService.unusedQuestionsWithCategory$.pipe(take(1))
      ),
      map((unusedQuestions) =>
        this._randomizationService.randomizeQuestion(unusedQuestions)
      ),
      withLatestFrom(this._randomizationFacade.randomizationLoaded$),
      map(([question, randomization]) => {
        if (question) {
          return updateRandomization({
            entity: {
              ...randomization,
              currentQuestion: question,
              isAnswerHidden: true,
              status: RandomizationStatus.Ongoing,
            } as Randomization,
          });
        } else {
          return updateRandomization({
            entity: {
              ...randomization,
              currentQuestion: undefined,
              isAnswerHidden: true,
              status: RandomizationStatus.Finished,
            } as Randomization,
          });
        }
      })
    )
  );

  updateRandomization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateRandomization),
      map((action) => action.entity),
      switchMap((randomization) => {
        const request =
          this._mapper.randomizationToRandomizationUpdateRequest(randomization);
        return this._randomizationService.updateRandomization(request).pipe(
          map(() =>
            updateRandomizationSuccess({
              id: randomization.id,
              changes: randomization,
            })
          ),
          catchError((error) => of(updateRandomizationError({ error })))
        );
      })
    )
  );

  updateQuestionAsCurrent$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateQuestionAsCurrent),
      map((action) => action.question),
      combineLatestWith(
        this._randomizationFacade.randomizationLoaded$.pipe(take(1))
      ),
      switchMap(([question, randomization]) => {
        const randomizationUpdated = {
          ...randomization,
          currentQuestion: question,
          isAnswerHidden: true,
          status: RandomizationStatus.Ongoing,
        } as Randomization;
        const request =
          this._mapper.randomizationToRandomizationUpdateRequest(
            randomizationUpdated
          );
        return combineLatest([
          this._randomizationService.updateRandomization(request),
          this._usedQuestionListService.deleteQuestionFromUsedQuestions(
            question.id,
            randomization.id
          ),
        ]).pipe(
          take(1),
          map(() =>
            updateQuestionAsCurrentSuccess({
              randomization: randomizationUpdated,
            })
          ),
          catchError((error) => of(updateQuestionAsCurrentError({ error })))
        );
      })
    )
  );

  resetRandomization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(resetRandomization),
      map((action) => action.randomizationId),
      switchMap((randomizationId) => {
        return this._randomizationService
          .resetRandomization(randomizationId)
          .pipe(
            map(() => resetRandomizationSuccess()),
            catchError((error) => of(resetRandomizationError({ error })))
          );
      })
    )
  );
}
