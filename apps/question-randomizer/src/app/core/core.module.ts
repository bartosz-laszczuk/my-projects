import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NotificationModule } from './_services/notification/question-randomizer-shared-util-notification.module';
import { DialogModule } from './_services/dialog/dialog.module';
import { environment } from '../../environments/environment';
import { CommonStoreModule } from './_store/common/common-store.module';
import { DictionariesStoreModule } from './_store/dictionaries/dictionaries-store.module';
import { AuthStoreModule } from '../auth/_store/auth-store.module';
import { SharedUiCrtLayoutDisplayComponent } from '@my-projects/shared/ui-crt';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from './_components/header/header.component';
import { LogoComponent } from './_components/logo/logo.component';
import { LanguageService } from './_services/language.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppOverlayContainer } from '../app-overlay-container';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    connectInZone: true}),
    NotificationModule.forRoot(),
    EffectsModule.forRoot(),
    // StoreRouterConnectingModule.forRoot(),
    // SharedUiCrtLayoutComponent,
    // QuestionRandomizerShellUiHeaderComponent,
    AngularFireModule.initializeApp(environment.firebase.config),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AuthStoreModule,
    CommonStoreModule,
    DictionariesStoreModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000',
    // }),
    DialogModule,
    HeaderComponent,
    LogoComponent,
    SharedUiCrtLayoutDisplayComponent,
    HttpClientModule,
  ],
  exports: [
    RouterModule,
    SharedUiCrtLayoutDisplayComponent,
    BrowserModule,
    HeaderComponent,
  ],
  providers: [
    { provide: OverlayContainer, useClass: AppOverlayContainer },
    LanguageService,
  ],
})
export class CoreModule {}
