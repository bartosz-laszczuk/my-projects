import { Component } from '@angular/core';

@Component({
  selector: 'my-projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'question-randomizer';

  isAuthorized$: Observable<boolean> = this.store.pipe(select(getIsAuthorized));
  user$: Observable<User | null> = this.store.pipe(select(getUser));
  breakpoint$ = this.logoBreakpointsService.breakpointHit$;
  isDialogVisible$ = this.commonFacade.isDialogVisible$;
  constructor(
    private router: Router,
    private store: Store,
    private logoBreakpointsService: LogoBreakpointsService,
    private commonFacade: CommonFacade,
    private matDialog: MatDialog // private serviceWorkerConfiguration: ServiceWorkerConfigurationService
  ) {}

  ngOnInit() {
    // this.isAuthorized$ = this.store.pipe(select(getIsAuthorized));
    // this.user$ = this.store.pipe(select(getUser));
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.matDialog.closeAll();
        this.commonFacade.changeDialogVisibility(false);
      }
    });

    this.matDialog.afterOpened.subscribe(() =>
      this.commonFacade.changeDialogVisibility(true)
    );

    this.matDialog.afterAllClosed.subscribe(() =>
      this.commonFacade.changeDialogVisibility(false)
    );

    this.store
      .pipe(select(getUserState))
      .pipe(
        filter((state) => !!state.uid),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(loadDictionaries());
      });

    // this.serviceWorkerConfiguration.init();
  }

  onSignOut() {
    this.store.dispatch(signOut());
  }
}
