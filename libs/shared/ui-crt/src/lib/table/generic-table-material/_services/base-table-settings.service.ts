import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  switchMap,
} from 'rxjs';
import { IColumn, SortDefinition } from '../_models';

export abstract class BaseTableSettingsService<T> {
  protected abstract results$: Observable<T[]>;
  public abstract columns: IColumn[];
  public readonly sortDefinition$ =
    new BehaviorSubject<SortDefinition<T> | null>(null);
  public readonly pageParameters$ = new BehaviorSubject<PageParamegers>();

  public get displayResults$(): Observable<T[]> {
    return combineLatest([this.sortDefinition$, this.pageParameters$]).pipe(
      switchMap(([sortDefinition, pageParameters]) => {
        return this.results$.pipe(
          map((results) => {
            sort(results), page(results);
          })
        );
      })
    );
  }
}
