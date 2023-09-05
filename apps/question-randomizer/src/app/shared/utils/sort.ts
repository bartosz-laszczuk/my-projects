import { SortDirection } from '@my-projects-nx/shared/ui/table/generic-table';

export const sortByString = (
  value1: string,
  value2: string,
  direction: SortDirection
) => {
  const valueToCompare1 = value1.toLowerCase();
  const valueToCompare2 = value2.toLowerCase();
  return direction === SortDirection.Asc
    ? valueToCompare1 > valueToCompare2
      ? 1
      : -1
    : valueToCompare1 < valueToCompare2
    ? 1
    : -1;
};
