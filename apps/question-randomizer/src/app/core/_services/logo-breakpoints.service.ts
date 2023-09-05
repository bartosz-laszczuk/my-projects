import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum LogoBreakpoint {
  XXLarge = '(max-width: 80em)',
  XLarge = '(max-width: 74em)',
  Large = '(max-width: 69em)',
  Medium = '(max-width: 60em)',
  Small = '(max-width: 40em)',
}

@Injectable({
  providedIn: 'root',
})
export class LogoBreakpointsService {
  public breakpointHit$ = new BehaviorSubject<LogoBreakpoint>(
    LogoBreakpoint.XXLarge
  );
  constructor(public breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        LogoBreakpoint.Small.toString(),
        LogoBreakpoint.Medium.toString(),
        LogoBreakpoint.Large.toString(),
        LogoBreakpoint.XLarge.toString(),
        LogoBreakpoint.XXLarge.toString(),
      ])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          const matches = Object.entries(state.breakpoints).find(
            (entry) => !!entry[1]
          ) as [string, boolean];
          this.breakpointHit$.next(matches[0] as LogoBreakpoint);
        } else {
          this.breakpointHit$.next(LogoBreakpoint.XXLarge);
        }
      });
  }
}
