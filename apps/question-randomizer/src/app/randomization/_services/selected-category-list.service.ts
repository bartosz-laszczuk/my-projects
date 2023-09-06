import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, Observable, switchMap, take } from 'rxjs';
import { RandomizationCategory } from '../_models/backend/randomization-category.model';
import { extractDocumentChangeActionData } from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class SelectedCategoryListService {
  constructor(private _db: AngularFirestore) {}

  loadSelectedCategories(
    randomizationId: string
  ): Observable<RandomizationCategory[]> {
    return this._db
      .collection('randomizationCategories', (ref: any) =>
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

  updateSelectedCategories(
    randomizationId: string,
    ids: string[]
  ): Observable<void> {
    return this._db
      .collection('randomizationCategories', (ref) =>
        ref.where('randomizationId', '==', randomizationId)
      )
      .get()
      .pipe(
        switchMap((querySnapshot) => {
          const batch = this._db.firestore.batch();
          querySnapshot.forEach((doc) => batch.delete(doc.ref));
          return from(batch.commit());
        }),
        switchMap(() => {
          const batch = this._db.firestore.batch();
          ids.forEach((id) => {
            const ref = this._db
              .collection('randomizationCategories')
              .doc().ref;
            batch.set(ref, { randomizationId, categoryId: id });
          });
          return from(batch.commit());
        })
      );
  }
}
