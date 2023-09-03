import { NgModule } from '@angular/core';
import { SharedUiCrtButtonsButtonComponent } from './button/shared-ui-crt-buttons-button.component';

const buttonImports = [SharedUiCrtButtonsButtonComponent];

@NgModule({
  declarations: [],
  imports: [...buttonImports],
  exports: [...buttonImports],
})
export class ButtonsModule {}
