import { Icon } from './icon.model';

export type Value = number | string | boolean;

export interface ControlItem {
  value: Value;
  label: string;
  icon?: Icon;
}
