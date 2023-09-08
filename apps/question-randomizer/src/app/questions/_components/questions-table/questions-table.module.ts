import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsTableComponent } from './questions-table.component';
import {
  GenericTableMaterialModule,
  PaginatorModule,
  SharedUiCrtControlsFormFieldComponent,
  SharedUiCrtControlsInputComponent,
} from '@my-projects/shared/ui-crt';

@NgModule({
  declarations: [QuestionsTableComponent],
  imports: [
    CommonModule,
    PaginatorModule,
    GenericTableMaterialModule,
    SharedUiCrtControlsFormFieldComponent,
    SharedUiCrtControlsInputComponent,
    FormsModule,
  ],
  exports: [QuestionsTableComponent],
})
export class QuestionsTableModule {}
