import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  AppConfig,
  APP_CONFIG,
} from '@my-projects-nx/question-randomizer/app-config';
import { User } from '@my-projects-nx/question-randomizer/shared/util/models/backend';
import { NotificationService } from '@my-projects-nx/question-randomizer/shared/util/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { serverTimestamp } from 'firebase/firestore';

import {
  catchError,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  createUser,
  createUserError,
  createUserSuccess,
  initUser,
  initUserAuthorizedSuccess,
  initUserError,
  initUserUnauthorizedSuccess,
  signInEmail,
  signInEmailError,
  signInEmailSuccess,
  signOut,
  signOutError,
  signOutSuccess,
  signUpEmail,
  signUpEmailError,
  signUpEmailSuccess,
  updateUser,
  updateUserError,
  updateUserSuccess,
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private _db: AngularFirestore,
    private router: Router,
    private notification: NotificationService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {}

  initUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUser),
      switchMap(() => this.afAuth.authState.pipe(take(1))),
      switchMap((authState) => {
        if (authState) {
          return this._db
            .doc<User>(`users/${authState.uid}`)
            .valueChanges()
            .pipe(
              take(1),
              map((entity) =>
                initUserAuthorizedSuccess({
                  uid: authState.uid,
                  entity: entity || null,
                })
              ),
              catchError((err) => of(initUserError(err)))
            );
        } else {
          return of(initUserUnauthorizedSuccess());
        }
      })
    )
  );

  signInEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInEmail),
      map((action) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          switchMap((signInState) =>
            this._db
              .doc<User>(`users/${signInState.user!.uid}`)
              .valueChanges()
              .pipe(
                take(1),
                tap(() => this.router.navigate(['/randomization'])),
                map((user) =>
                  signInEmailSuccess({
                    uid: signInState.user!.uid,
                    user: user || null,
                  })
                )
              )
          ),
          catchError((err) => {
            this.notification.error(err.message);
            return of(signInEmailError(err.message));
          })
        )
      )
    )
  );

  signUpEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpEmail),
      map((action) => action.credentials),
      switchMap((credentials) =>
        from(
          this.afAuth.createUserWithEmailAndPassword(
            credentials.email,
            credentials.password
          )
        ).pipe(
          tap(() => {
            this.afAuth.currentUser.then((u) =>
              u!.sendEmailVerification(
                this.appConfig.firebase.actionCodeSettings
              )
            );
            this.router.navigate(['/auth', 'email-confirm']);
          }),
          map((signUpState) =>
            signUpEmailSuccess({ uid: signUpState.user!.uid })
          ),
          catchError((err) => {
            this.notification.error(err.message);
            return of(signUpEmailError(err.message));
          })
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() =>
        from(this.afAuth.signOut()).pipe(
          tap(() => this.router.navigate(['/auth/login'])),
          map(() => signOutSuccess()),
          catchError((err) => {
            this.notification.error(err.message);
            return of(signOutError(err.message));
          })
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      map((action) => action.request),
      withLatestFrom(this.afAuth.authState.pipe(take(1))),
      map(
        ([request, state]) =>
          ({
            ...request,
            uid: state?.uid,
            email: state?.email,
            created: serverTimestamp(),
          } as User)
      ),
      switchMap((entity: User) =>
        from(this._db.collection('users').doc(entity.uid).set(entity)).pipe(
          tap(() => this.router.navigate(['/profile', entity.uid])),
          map(() => createUserSuccess({ entity })),
          catchError((err) => of(createUserError({ error: err.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      map((action) => action.entity),
      switchMap((entity) =>
        from(this._db.collection('users').doc(entity.uid).set(entity)).pipe(
          tap(() => this.router.navigate(['/profile', entity.uid])),
          map(() => updateUserSuccess({ entity })),
          catchError((err) => of(updateUserError({ error: err.message })))
        )
      )
    )
  );
}
