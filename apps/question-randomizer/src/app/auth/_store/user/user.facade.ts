import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, flatMap, map } from 'rxjs';
import { getUserId } from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  userId$ = this.store.pipe(
    select(getUserId),
    filter((uid) => !!uid),
    map((uid) => uid as string)
  );
  constructor(private store: Store) {}
}
