import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SharedUiCrtLayoutComponent } from '@my-projects/shared/ui-crt';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CoreRoutingModule, SharedUiCrtLayoutComponent],
  exports: [RouterModule, SharedUiCrtLayoutComponent],
})
export class CoreModule {}
