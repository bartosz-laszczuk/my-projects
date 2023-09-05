import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getIsDialogVisible } from './common.selectors';
import { changeDialogVisibility } from './common.actions';

@Injectable({
  providedIn: 'root',
})
export class CommonFacade {
  isDialogVisible$ = this.store.pipe(select(getIsDialogVisible));

  constructor(private store: Store) {}

  changeDialogVisibility(isDialogVisible: boolean) {
    this.store.dispatch(changeDialogVisibility({ isDialogVisible }));
  }
}
