import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CoreRoutingModule],
  exports: [RouterModule],
})
export class CoreModule {}
