import { Injectable } from '@angular/core';
import { QuestionCreateRequest } from '../../_models/backend/question-create-request.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { serverTimestamp } from 'firebase/firestore';
import * as moment from 'moment';
import { catchError, combineLatest, map, of, switchMap, take, tap } from 'rxjs';
import { QuestionsFacade } from '../questions.facade';
import { withLatestFrom } from 'rxjs';
import {
  createQuestion,
  createQuestionError,
  createQuestionSuccess,
  deleteQuestion,
  deleteQuestionError,
  deleteQuestionSuccess,
  exportQuestionList,
  importQuestionList,
  importQuestionListError,
  importQuestionListSuccess,
  loadQuestionList,
  loadQuestionListError,
  loadQuestionListSuccess,
  updateQuestion,
  updateQuestionError,
  updateQuestionSuccess,
} from './list.actions';
import { Question } from '../../_models/frontend/question.model';
import { DictionariesFacade } from '../../../core/_store/dictionaries/dictionaries.facade';
import { QuestionMapperService } from '../../_services/question-mapper.service';
import { NotificationService } from '../../../core/_services/notification/notification.service';
import { QuestionListService } from '../../_services/question-list.service';
import { QuestionCsvListItem } from '../../_models/frontend/question-csv-list-item.model';
import { exportToCsv } from '../../../shared/utils';

@Injectable()
export class ListEffects {
  constructor(
    private actions$: Actions,
    private questionListService: QuestionListService,
    private dictionariesFacade: DictionariesFacade,
    private questionsFacade: QuestionsFacade,
    private mapper: QuestionMapperService,
    private notificationService: NotificationService
  ) {}

  loadQuestionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadQuestionList),
      switchMap(() =>
        this.questionListService.loadQuestionList().pipe(
          withLatestFrom(this.dictionariesFacade.categoriesLoaded$),
          map(([questionListBe, categories]) => {
            const questionList = questionListBe.map((questionBe) =>
              this.mapper.questionDbQuestionFe(questionBe, categories)
            );
            return loadQuestionListSuccess({ entities: questionList });
          }),
          catchError((err) => of(loadQuestionListError({ error: err.message })))
        )
      )
    )
  );

  importQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(importQuestionList),
      map((action) => action.entities),
      switchMap((entities) =>
        combineLatest([
          this.dictionariesFacade.categoriesLoaded$,
          this.dictionariesFacade.qualificationsLoaded$,
        ]).pipe(
          take(1),
          map(([categories, qualifications]) =>
            entities.map((entity) =>
              this.mapper.questionCsvToQuestionCreateRequest(
                entity,
                categories,
                qualifications
              )
            )
          )
        )
      ),
      switchMap((entities: QuestionCreateRequest[]) => {
        return this.questionListService.createQuestions(entities).pipe(
          map(() => importQuestionListSuccess()),
          catchError((err) =>
            of(importQuestionListError({ error: err.message }))
          )
        );
      })
    )
  );

  importQuestionListSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(importQuestionListSuccess),
      map(() => loadQuestionList())
    )
  );

  exportQuestionList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(exportQuestionList),
        switchMap(() =>
          combineLatest([
            this.dictionariesFacade.qualificationsLoaded$,
            this.dictionariesFacade.categoriesLoaded$,
            this.questionsFacade.questionListLoaded$,
          ]).pipe(take(1))
        ),
        tap(([qualifications, categories, questionList]) => {
          const questionExportList = [] as QuestionCsvListItem[];

          questionList.forEach((question) =>
            questionExportList.push({
              question: question.question,
              answer: question.answer,
              answerPl: question.answerPl,
              categoryName: categories.find(
                (category) => category.id === question.categoryId
              )?.name,
              qualificationName: qualifications.find(
                (qualification) => qualification.id === question.qualificationId
              )?.name,
              isActive: question.isActive ?? true,
            } as QuestionCsvListItem)
          );

          const fileName = `${moment(new Date()).format('YYYYMMDD')}_questions`;
          const headers = [
            'Question',
            'Answer',
            'AnswerPl',
            'Type',
            'Qualification',
            'IsActive',
          ];
          exportToCsv(fileName, questionExportList, headers);
        })
      ),
    { dispatch: false }
  );

  createQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createQuestion),
      map((action) => action.entity),
      map((entity: QuestionCreateRequest) => ({
        ...entity,
        created: serverTimestamp(),
      })),
      switchMap((entity: QuestionCreateRequest) =>
        this.questionListService.createQuestion(entity).pipe(
          switchMap((id) => this.questionListService.loadQuestion(id)),
          withLatestFrom(this.dictionariesFacade.categoriesLoaded$),
          map(([questionBe, categories]) =>
            this.mapper.questionDbQuestionFe(questionBe, categories)
          ),
          map((question) => createQuestionSuccess({ entity: question })),
          catchError((err) => of(createQuestionError({ error: err.message })))
        )
      )
    )
  );

  updateQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateQuestion),
      map((action) => action.entity),
      map((entity: Question) => ({
        ...entity,
        updated: serverTimestamp(),
      })),
      switchMap((entity) =>
        this.questionListService
          .updateQuestion(this.mapper.questionToDbQuestion(entity))
          .pipe(
            map(() =>
              updateQuestionSuccess({ id: entity.id, changes: entity })
            ),
            catchError((err) => of(updateQuestionError({ error: err.message })))
          )
      )
    )
  );

  deleteQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteQuestion),
      map((action) => action.id),
      switchMap((id) =>
        this.questionListService.deleteQuestion(id).pipe(
          tap(() => this.notificationService.success('Deleted successfully!')),
          map(() => deleteQuestionSuccess({ id })),
          catchError((err) => of(deleteQuestionError({ error: err.message })))
        )
      )
    )
  );
}
