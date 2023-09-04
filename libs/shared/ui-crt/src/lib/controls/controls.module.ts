import { NgModule } from '@angular/core';
import { SharedUiCrtControlsSelectComponent } from './select/shared-ui-crt-controls-select.component';
import { SharedUiCrtControlsInputComponent } from './input/shared-ui-crt-controls-input.component';
import { SharedUiCrtControlsFormFieldComponent } from './form-field/shared-ui-crt-controls-form-field.component';
import { SharedUiCrtControlsPasswordComponent } from './password/shared-ui-crt-controls-password.component';
import { SharedUiCrtControlsCheckboxesComponent } from './checkboxes/shared-ui-crt-controls-checkboxes.component';

const controls = [
  SharedUiCrtControlsInputComponent,
  SharedUiCrtControlsFormFieldComponent,
  SharedUiCrtControlsPasswordComponent,
  SharedUiCrtControlsSelectComponent,
  SharedUiCrtControlsCheckboxesComponent,
  //   RadiosModule,
  //   DateModule,
  //   DateRangeModule,
  //   AutocompleteModule,
];

@NgModule({
  declarations: [],
  imports: [...controls],
  exports: [...controls],
})
export class ControlsModule {}
