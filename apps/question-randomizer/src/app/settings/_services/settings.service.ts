import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../../core/_enums/language.enum';

// This should be in store
@Injectable()
export class SettingsService {
  private readonly _languageKey = 'language';
  private readonly _interviewModeKey = 'interviewMode';

  public language$ = new BehaviorSubject<Language>(Language.ENGLISH);
  public interviewMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const language = (localStorage.getItem(this._languageKey) ??
      Language.ENGLISH) as Language;
    this.language$.next(language);

    const interviewMode =
      (localStorage.getItem(this._interviewModeKey) ?? 'false') === 'true';
    this.interviewMode$.next(interviewMode);
  }

  public setLanguage(language: Language) {
    localStorage.setItem(this._languageKey, language);
    this.language$.next(language);
  }

  public setInterviewMode(interviewMode: boolean) {
    localStorage.setItem(this._interviewModeKey, `${interviewMode}`);
    this.interviewMode$.next(interviewMode);
  }

  public setGlobalInterviewModeStyles() {
    this.interviewMode$.subscribe((interviewMode) => {
      const interlace = document.querySelector('.interlace') as HTMLElement;
      interlace.style.display = interviewMode ? 'none' : 'block';
    });
  }
}
