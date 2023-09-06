import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { loadRandomizationSuccess } from '../randomization/randomization.actions';
import { RandomizationFacade } from '../randomization/randomization.facade';
import {
  loadSelectedCategoryList,
  loadSelectedCategoryListError,
  loadSelectedCategoryListSuccess,
  updateSelectedCategoryList,
  updateSelectedCategoryListError,
  updateSelectedCategoryListSuccess,
} from './selected-category-list.actions';
import { SelectedCategoryListService } from '../../_services/selected-category-list.service';
import { DictionariesFacade } from '../../../core/_store/dictionaries/dictionaries.facade';
import { RandomizationMapperService } from '../../_services/randomization-mapper.service';
import { Category } from '../../_models/frontend/category.model';

@Injectable()
export class SelectedCategoryListEffects {
  constructor(
    private _actions$: Actions,
    private _selectedCategoryListService: SelectedCategoryListService,
    private _dictionariesFacade: DictionariesFacade,
    private _randomizationFacade: RandomizationFacade,
    private _mapper: RandomizationMapperService
  ) {}

  loadSelectedCategoryList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadSelectedCategoryList),
      map((action) => action.randomizationId),
      switchMap((randomizationId) =>
        this._selectedCategoryListService
          .loadSelectedCategories(randomizationId)
          .pipe(
            withLatestFrom(this._dictionariesFacade.categoriesLoaded$),
            map(([entities, categories]) =>
              entities.map((entity) =>
                this._mapper.randomizationCategoryToCategory(entity, categories)
              )
            ),
            map((entities) => loadSelectedCategoryListSuccess({ entities })),
            catchError((err) =>
              of(loadSelectedCategoryListError({ error: err.message }))
            )
          )
      )
    )
  );

  loadRandomizationSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRandomizationSuccess),
      map((action) => action.entity.id),
      map((randomizationId) => loadSelectedCategoryList({ randomizationId }))
    )
  );

  updateSelectedCategoryList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateSelectedCategoryList),
      map((action) => action.ids),
      withLatestFrom(this._randomizationFacade.randomizationLoaded$),
      switchMap(([ids, randomization]) =>
        this._selectedCategoryListService
          .updateSelectedCategories(randomization.id, ids)
          .pipe(
            switchMap(() => this._dictionariesFacade.categoriesLoaded$),
            map((categories) =>
              categories
                .filter((category) => ids.some((id) => id === category.id))
                .map((category) => ({ ...category } as Category))
            ),
            map((categories) =>
              updateSelectedCategoryListSuccess({ entities: categories })
            ),
            catchError((err) =>
              of(updateSelectedCategoryListError({ error: err.message }))
            )
          )
      )
    )
  );
}
