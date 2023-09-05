import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadDictionaries,
  loadDictionariesError,
  loadDictionariesSuccess,
} from './dictionaries.actions';
import { DictionariesService } from '../../_services/dictionaries.service';

@Injectable()
export class DictionariesEffects {
  constructor(
    private actions$: Actions,
    private dictionaries: DictionariesService
  ) {}

  loadDictionaries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDictionaries),
      switchMap(() => {
        return this.dictionaries.getDictionaries().pipe(
          map((entities) => loadDictionariesSuccess({ entities })),
          catchError((err) => of(loadDictionariesError({ error: err.message })))
        );
      })
    )
  );
}
