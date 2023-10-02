import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, take, tap } from 'rxjs';
import { getUserState } from '../../../auth/_store/user/user.selectors';
import { initUser } from '../../../auth/_store/user/user.actions';

export const AuthCanActivate: CanActivateFn = (route, state) => {
  return check();
};

export const AuthCanActivateChild: CanActivateChildFn = (route, state) => {
  return check();
};

function check(): Observable<boolean> {
  const router = inject(Router);
  const store = inject(Store);
  return store.pipe(select(getUserState)).pipe(
    tap((state) => {
      if (state.isLoading === null) {
        store.dispatch(initUser());
      }
    }),
    filter((state) => state.isLoading === false),
    take(1),
    tap((state) => {
      if (!state.uid) {
        router.navigate(['auth', 'login']);
      }
    }),
    map((state) => !!state.uid)
  );
}

// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   CanActivateChild,
//   CanLoad,
//   Route,
//   UrlSegment,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { filter, map, take, tap } from 'rxjs/operators';

// import { Store, select } from '@ngrx/store';
// import { getUserState } from '../../../auth/_store/user/user.selectors';
// import { initUser } from '../../../auth/_store/user/user.actions';
// // import { getUserState } from '../../_state/user/user.selectors';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
//   constructor(private router: Router, private store: Store) {}

//   private check(): Observable<boolean> {
//     return this.store.pipe(select(getUserState)).pipe(
//       tap((state) => {
//         if (state.isLoading === null) {
//           this.store.dispatch(initUser());
//         }
//       }),
//       filter((state) => state.isLoading === false),
//       take(1),
//       tap((state) => {
//         if (!state.uid) {
//           this.router.navigate(['auth', 'login']);
//         }
//       }),
//       map((state) => !!state.uid)
//     );
//   }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     return this.check();
//   }
//   canActivateChild(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     return this.check();
//   }
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.check();
//   }
// }
