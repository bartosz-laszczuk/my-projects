import { Injectable } from '@angular/core';
// import * as jsonCountries from '@question-randomizer/assets/countries.json';
import { map, Observable, of, switchMap, take, zip } from 'rxjs';
import { Dictionaries } from '../_models/frontend/dictionaries.model';
import { DictionaryItem } from '../_models/frontend';
import { UserFacade } from '../../auth/_store/user/user.facade';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {
  constructor(private _db: AngularFirestore, private userFacade: UserFacade) {}

  getDictionaries(): Observable<Dictionaries> {
    const documentToDictionaryItem = (
      x: DocumentChangeAction<any>
    ): DictionaryItem => {
      const data = x.payload.doc.data();
      return {
        id: x.payload.doc.id,
        name: data.name,
      } as DictionaryItem;
    };

    const roles$ = this._db
      .collection('roles')
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((x) => documentToDictionaryItem(x)))
      );
    const specializations$ = this._db
      .collection('specializations')
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((x) => documentToDictionaryItem(x)))
      );
    const qualifications$ = this._db
      .collection('qualifications')
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((x) => documentToDictionaryItem(x)))
      );
    const skills$ = this._db
      .collection('skills')
      .snapshotChanges()
      .pipe(
        take(1),
        map((items) => items.map((x) => documentToDictionaryItem(x)))
      );
    const countries$ = of(
      // TODO
      // (jsonCountries as any).default.map(
      [].map((country: { name: string; code: string }) => ({
        id: country.code.toUpperCase(),
        name: country.name,
        icon: {
          src: null as any,
          cssClass: 'fflag fflag-' + country.code.toUpperCase(),
        },
      }))
    );
    const categories$ = this.userFacade.userId$.pipe(
      take(1),
      switchMap((uid) =>
        this._db
          .collection('categories', (ref: any) => ref.where('uid', '==', uid))
          .snapshotChanges()
          .pipe(
            take(1),
            map((items) => items.map((x) => documentToDictionaryItem(x)))
          )
      )
    );

    return zip(
      roles$,
      specializations$,
      qualifications$,
      skills$,
      countries$,
      categories$
    ).pipe(
      map(
        ([
          roles,
          specializations,
          qualifications,
          skills,
          countries,
          categories,
        ]) => {
          const entities = {
            roles,
            specializations,
            qualifications,
            skills,
            countries,
            categories,
          } as Dictionaries;
          return entities;
        }
      )
    );
  }
}
