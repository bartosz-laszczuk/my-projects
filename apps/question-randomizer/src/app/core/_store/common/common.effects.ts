import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class CommonEffects {
  constructor(private actions$: Actions) {}

  // loadDictionaries$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(handleError),
  //       tap((err) => console.log('handleError effect: ', err))
  //     ),
  //   { dispatch: false }
  // );
}
