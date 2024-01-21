import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedUiCrtLayoutDisplayService {
  private readonly _animationsEnabledKey: string = 'animationsEnabled';

  public animationsEnabled$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const animationsEnabled =
      (localStorage.getItem(this._animationsEnabledKey) ?? 'true') === 'true';
    this.animationsEnabled$.next(animationsEnabled);
  }

  public setAnimationsEnabled(animationsEnabled: boolean) {
    localStorage.setItem(this._animationsEnabledKey, `${animationsEnabled}`);
    this.animationsEnabled$.next(animationsEnabled);
  }
}
