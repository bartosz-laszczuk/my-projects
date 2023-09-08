import { SortDirection } from '@angular/material/sort';

export interface IColumn {
  displayName: string;
  propertyName: string;
  sortName?: string;
  sortable?: boolean;
  initSortDirection?: SortDirection;
  // filtersOptions?: DictionaryModel[];
  stickyStart?: boolean;
  stickyEnd?: boolean;
  width?: string;
}

export interface IComlumInputDirective {
  propertyName: string;
  type: string;
}

export const TypeOfTemplateEnum = {
  COLUMN: 'COLUMN',
  FILTER: 'FILTER',
};
