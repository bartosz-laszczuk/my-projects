import { DictionaryItem } from './dictionary-item.model';

export interface Dictionaries {
  roles: DictionaryItem[];
  specializations: DictionaryItem[];
  qualifications: DictionaryItem[];
  skills: DictionaryItem[];
  countries: DictionaryItem[];
  categories: DictionaryItem[];
}
