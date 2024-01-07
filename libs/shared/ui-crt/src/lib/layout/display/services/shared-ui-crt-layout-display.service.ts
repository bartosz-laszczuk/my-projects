import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedUiCrtLayoutDisplayService {
  private _animationsEnabledKey: string = 'animationsEnabled';

  public animationsEnabled$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const animationsEnabled = (localStorage.getItem(
      this._animationsEnabledKey
    ) ?? true) as boolean;

    this.animationsEnabled$.next(animationsEnabled);
  }

  public setAnimationsEnabled(animationsEnabled: boolean) {
    localStorage.setItem(this._animationsEnabledKey, `${animationsEnabled}`);
    this.animationsEnabled$.next(animationsEnabled);
  }
}
