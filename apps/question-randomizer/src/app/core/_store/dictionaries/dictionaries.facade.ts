import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs';
import { getQualifications, getCategories } from './dictionaries.selectors';
import { dictionaryItemToControlItem } from '../../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class DictionariesFacade {
  categoriesLoaded$ = this.store.pipe(
    select(getCategories),
    filter((categories) => !!categories),
    take(1)
  );
  categoryControlItems$ = this.categoriesLoaded$.pipe(
    map((categories) =>
      categories.map((item) => dictionaryItemToControlItem(item))
    )
  );

  qualificationsLoaded$ = this.store.pipe(
    select(getQualifications),
    filter((qualifications) => !!qualifications),
    take(1)
  );
  qualificationControlItems$ = this.qualificationsLoaded$.pipe(
    map((_qualifications) =>
      _qualifications.map((item) => dictionaryItemToControlItem(item))
    )
  );

  constructor(private store: Store) {}
}
