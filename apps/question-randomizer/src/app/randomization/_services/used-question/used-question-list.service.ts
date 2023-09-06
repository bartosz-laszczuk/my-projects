import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, switchMap, take } from 'rxjs';
import { UsedQuestion } from '../../_models/backend/used-question/used-question.model';
import { extractDocumentChangeActionData } from '../../../shared/utils';
import { UsedQuestionCreateRequest } from '../../_models/backend/used-question/used-question-create-request.model';

@Injectable({
  providedIn: 'root',
})
export class UsedQuestionListService {
  constructor(private _db: AngularFirestore) {}

  loadUsedQuestionList(randomizationId: string): Observable<UsedQuestion[]> {
    return this._db
      .collection('randomizationUsedQuestions', (ref: any) =>
        ref.where('randomizationId', '==', randomizationId)
      )
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes: any) =>
          changes.map((x: any) => extractDocumentChangeActionData(x))
        )
      );
  }

  loadUsedQuestion(id: string): Observable<UsedQuestion> {
    return this._db
      .doc<UsedQuestion>(`randomizationUsedQuestions/${id}`)
      .valueChanges()
      .pipe(
        take(1),
        map((entity) => entity as UsedQuestion)
      );
  }

  addQuestionToUsedQuestions(
    request: UsedQuestionCreateRequest
  ): Observable<string> {
    return from(
      this._db.collection('randomizationUsedQuestions').add(request)
    ).pipe(map((res) => res.id));
  }

  deleteQuestionFromUsedQuestions(
    questionId: string,
    randomizationId: string
  ): Observable<void> {
    return this._db
      .collection('randomizationUsedQuestions', (ref) =>
        ref
          .where('questionId', '==', questionId)
          .where('randomizationId', '==', randomizationId)
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
}
