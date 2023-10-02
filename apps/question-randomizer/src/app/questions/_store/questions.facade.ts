import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, of } from 'rxjs';
import {
  createQuestion,
  deleteQuestion,
  exportQuestionList,
  importQuestionList,
  loadQuestionList,
  updateQuestion,
} from './list/list.actions';
import { getQuestionList } from './list/list.selectors';
import { QuestionsState } from './questions.reducer';
import { QuestionMapperService } from '../_services/question-mapper.service';
import { Question } from '../_models/frontend/question.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuestionCsvListItem } from '../_models/frontend/question-csv-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsFacade {
  questionList$ = this._store.pipe(select(getQuestionList));
  questionListLoaded$ = this.questionList$.pipe(
    filter((questionList) => !!questionList),
    map((questionList) => questionList as Question[])
  );
  qestionListLoadedSignal = toSignal<Question[], Question[]>(
    this.questionListLoaded$,
    { initialValue: [] }
  );

  constructor(
    private _store: Store<QuestionsState>,
    private _mapper: QuestionMapperService
  ) {}

  loadQuestionList() {
    this._store.dispatch(loadQuestionList());
  }

  exportQuestionList() {
    this._store.dispatch(exportQuestionList());
  }

  createQuestion(entity: Question) {
    this._store.dispatch(
      createQuestion({
        entity: this._mapper.questionToQuestionCreateRequest(entity),
      })
    );
  }

  updateQuestion(entity: Question) {
    this._store.dispatch(updateQuestion({ entity }));
  }

  deleteQuestion(id: string) {
    this._store.dispatch(deleteQuestion({ id }));
  }

  importQuestionList(entities: QuestionCsvListItem[]) {
    this._store.dispatch(importQuestionList({ entities }));
  }

  getUnitTestPracticeString(): Observable<string> {
    return of('practice string');
  }
}
