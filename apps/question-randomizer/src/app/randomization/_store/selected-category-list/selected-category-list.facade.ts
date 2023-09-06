import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { updateSelectedCategoryList } from './selected-category-list.actions';
import { SelectedCategoryListState } from './selected-category-list.reducer';
import { getSelectedCategoryList } from './selected-category-list.selectors';

@Injectable({
  providedIn: 'root',
})
export class SelectedCategoryListFacade {
  private _selectedCategoryList$ = this._store.pipe(
    select(getSelectedCategoryList)
  );

  selectedCategoryIdListLoaded$ = this._selectedCategoryList$.pipe(
    filter((selectedCategoryList) => !!selectedCategoryList),
    map((selectedCategoryList) =>
      selectedCategoryList!.map((selectedCategory) => selectedCategory.id)
    )
  );

  constructor(private _store: Store<SelectedCategoryListState>) {}

  updateSelectedCategoryList(ids: string[]) {
    this._store.dispatch(updateSelectedCategoryList({ ids }));
  }
}
