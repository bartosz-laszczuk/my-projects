import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, take } from 'rxjs';
import { Question } from '../_models/backend/question.model';
import { extractDocumentChangeActionData } from '../../shared/utils';
import { QuestionCreateRequest } from '../_models/backend/question-create-request.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionListService {
  constructor(private _db: AngularFirestore) {}

  loadQuestion(id: string): Observable<Question> {
    return this._db
      .doc<Question>(`questions/${id}`)
      .valueChanges()
      .pipe(
        take(1),
        map((question) => question as Question)
      );
  }

  loadQuestionList(): Observable<Array<Question>> {
    return this._db
      .collection('questions', (ref) => ref.orderBy('created'))
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes: any) =>
          changes.map((x: any) => extractDocumentChangeActionData(x))
        )
      );
  }

  createQuestion(entity: QuestionCreateRequest): Observable<string> {
    return from(this._db.collection('questions').add(entity)).pipe(
      map((res) => res.id)
    );
  }

  updateQuestion(entity: Question): Observable<void> {
    return from(this._db.collection('questions').doc(entity.id).set(entity));
  }

  createQuestions(entities: QuestionCreateRequest[]): Observable<void> {
    const batch = this._db.firestore.batch();
    entities.forEach((entity) => {
      const ref = this._db.collection('questions').doc().ref;
      batch.set(ref, entity);
    });
    return from(batch.commit());
  }

  deleteQuestion(id: string): Observable<void> {
    return from(this._db.collection('questions').doc(id).delete());
  }
}
