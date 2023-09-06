import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  combineLatest,
  from,
  map,
  Observable,
  take,
  switchMap,
  zip,
} from 'rxjs';
import { UsedQuestionListFacade } from '../_store/used-question-list/used-question-list.facade';
import { SelectedCategoryListFacade } from '../_store/selected-category-list/selected-category-list.facade';
import { QuestionsFacade } from '../../questions/_store/questions.facade';
import {
  extractDocumentChangeActionData,
  isWhatPercentOf,
} from '../../shared/utils';
import { RandomizationStatus } from '../_enums/randomization-status.enum';
import { Randomization } from '../_models/backend/randomization.model';
import { RandomizationCreateRequest } from '../_models/backend/randomization-create-request.model';
import { RandomizationUpdateRequest } from '../_models/backend/randomization/randomization-update-request.model';
import { Question } from '../../questions/_models/frontend/question.model';

@Injectable({
  providedIn: 'root',
})
export class RandomizationService {
  private _activeQuestionsWithCategory$: Observable<Question[]> = combineLatest(
    [
      this._questionsFacade.questionListLoaded$,
      this._selectedCategoryListFacade.selectedCategoryIdListLoaded$,
    ]
  ).pipe(
    map(([questionList, selectedCategoryIdList]) =>
      questionList.filter(
        (question) =>
          selectedCategoryIdList.some(
            (selectedCategoryId) => selectedCategoryId === question.categoryId
          ) && question.isActive
      )
    )
  );

  randomizationProgress$: Observable<number> = combineLatest([
    this._activeQuestionsWithCategory$,
    this._usedQuestionListFacade.usedQuestionIdListLoaded$,
  ]).pipe(
    map(([questionsWithCategory, usedQuestionIdList]) => {
      const usedQuestionsWithCategory = questionsWithCategory.filter(
        (question) =>
          usedQuestionIdList.some(
            (usedQuestionId) => usedQuestionId === question.id
          )
      );
      return Math.round(
        isWhatPercentOf(
          usedQuestionsWithCategory.length,
          questionsWithCategory.length
        )
      );
    })
  );

  usedQuestionsWithCategory$: Observable<Question[]> = combineLatest([
    this._activeQuestionsWithCategory$,
    this._usedQuestionListFacade.usedQuestionIdListLoaded$,
  ]).pipe(
    map(([questionsWithCategory, usedQuestionIdList]) =>
      questionsWithCategory.filter((question) =>
        usedQuestionIdList.some(
          (usedQuestionId) => usedQuestionId === question.id
        )
      )
    )
  );

  unusedQuestionsWithCategory$: Observable<Question[]> = combineLatest([
    this._activeQuestionsWithCategory$,
    this._usedQuestionListFacade.usedQuestionIdListLoaded$,
  ]).pipe(
    map(([questionsWithCategory, usedQuestionIdList]) =>
      questionsWithCategory.filter(
        (question) =>
          !usedQuestionIdList.some(
            (usedQuestionId) => usedQuestionId === question.id
          )
      )
    )
  );

  previousQuestion$: Observable<Question> = combineLatest([
    this._activeQuestionsWithCategory$,
    this._usedQuestionListFacade.usedQuestionListLoadedSortedByCreated$,
  ]).pipe(
    map(([questionsWithCategory, usedQuestions]) => {
      const usedQuestionsWithCategory = usedQuestions.filter((usedQuestion) =>
        questionsWithCategory.some(
          (question) => question.id === usedQuestion.questionId
        )
      );
      return questionsWithCategory.find(
        (question) => question.id === usedQuestionsWithCategory[0].questionId
      )!;
    })
  );

  constructor(
    private _db: AngularFirestore,
    private _questionsFacade: QuestionsFacade,
    private _usedQuestionListFacade: UsedQuestionListFacade,
    private _selectedCategoryListFacade: SelectedCategoryListFacade
  ) {}

  loadRandomization(uid: string): Observable<Randomization> {
    return this._db
      .collection('randomizations', (ref: any) => ref.where('uid', '==', uid))
      .snapshotChanges()
      .pipe(
        take(1),
        map(
          (changes: any) =>
            changes.map((x: any) => extractDocumentChangeActionData(x))[0]
        )
      );
  }

  createRandomization(request: RandomizationCreateRequest) {
    return from(this._db.collection('randomizations').add(request)).pipe(
      map(
        (response) =>
          ({
            id: response.id,
            status: request.status,
            created: request.created,
            uid: request.uid,
          } as Randomization)
      )
    );
  }

  updateRandomization(randomization: RandomizationUpdateRequest) {
    return from(
      this._db
        .collection('randomizations')
        .doc(randomization.id)
        .update({ ...randomization })
    );
  }

  resetRandomization(randomizationId: string) {
    return zip(
      this.deleteRandomizationUsedQuestions(randomizationId),
      this.updateRandomizationStatus(
        randomizationId,
        RandomizationStatus.Ongoing
      )
    );
  }

  randomizeQuestion(questions: Question[]): Question {
    return questions[Math.floor(Math.random() * questions.length)];
  }

  private deleteRandomizationUsedQuestions(randomizationId: string) {
    return this._db
      .collection('randomizationUsedQuestions', (ref) =>
        ref.where('randomizationId', '==', randomizationId)
      )
      .get()
      .pipe(
        switchMap((querySnapshot) => {
          const batch = this._db.firestore.batch();
          querySnapshot.forEach((doc) => batch.delete(doc.ref));
          return from(batch.commit());
        })
      );
  }

  private updateRandomizationStatus(
    randomizationId: string,
    status: RandomizationStatus
  ) {
    return from(
      this._db
        .collection('randomizations')
        .doc(randomizationId)
        .update({ status })
    );
  }
}
