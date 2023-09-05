import { DictionaryItem } from '@question-randomizer/app/core/_models/frontend';

export interface Dictionaries {
  roles: DictionaryItem[];
  specializations: DictionaryItem[];
  qualifications: DictionaryItem[];
  skills: DictionaryItem[];
  countries: DictionaryItem[];
  categories: DictionaryItem[];
}
