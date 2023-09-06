import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../_enums/language.enum';

// This should be in store
@Injectable()
export class LanguageService {
  private _languageKey = 'language';

  public language$ = new BehaviorSubject<Language>(Language.ENGLISH);

  constructor() {
    const language = localStorage.getItem(this._languageKey) as Language;
    if (language) {
      this.language$.next(language);
    }
  }

  public setLanguage(language: Language) {
    localStorage.setItem(this._languageKey, language);
    this.language$.next(language);
  }
}
