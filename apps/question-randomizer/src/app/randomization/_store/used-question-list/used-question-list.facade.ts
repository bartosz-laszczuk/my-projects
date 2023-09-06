import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import {
  addQuestionToUsedQuestions,
  deleteQuestionFromUsedQuestions,
} from './used-question-list.actions';
import { UsedQuestionListState } from './used-question-list.reducer';
import { getUsedQuestionList } from './used-question-list.selectors';
import { UsedQuestion } from '../../_models/frontend/used-question.model';

@Injectable({
  providedIn: 'root',
})
export class UsedQuestionListFacade {
  private _usedQuestionList$ = this._store.pipe(select(getUsedQuestionList));

  usedQuestionListLoaded$ = this._usedQuestionList$.pipe(
    filter((usedQuestionList) => !!usedQuestionList),
    map((usedQuestionList) => usedQuestionList as UsedQuestion[])
  );

  usedQuestionListLoadedSortedByCreated$ = this.usedQuestionListLoaded$.pipe(
    map((usedQuestionList) =>
      [...usedQuestionList].sort((questionA, questionB) =>
        (questionA.created as any).seconds < (questionB.created as any).seconds
          ? 1
          : -1
      )
    )
  );

  usedQuestionIdListLoaded$ = this.usedQuestionListLoaded$.pipe(
    map((usedQuestionList) =>
      usedQuestionList!.map((question) => question.questionId)
    )
  );

  constructor(private _store: Store<UsedQuestionListState>) {}

  addQuestionToUsedQuestions(questionId: string) {
    this._store.dispatch(addQuestionToUsedQuestions({ questionId }));
  }

  deleteQuestionFromUsedQuestions(questionId: string) {
    this._store.dispatch(deleteQuestionFromUsedQuestions({ questionId }));
  }
}
