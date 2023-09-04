import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
