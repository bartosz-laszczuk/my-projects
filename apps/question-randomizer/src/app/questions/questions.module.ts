import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { questionsRoutes } from './lib.routes';
import { QuestionsComponent } from './questions.component';
import { QuestionsStoreModule } from './_store/questions-store.module';
import {
  GenericTableMaterialModule,
  SharedUiCrtButtonsButtonComponent,
} from '@my-projects/shared/ui-crt';
import { QuestionItemComponent } from './_components/question-item/question-item.component';
import { EditQuestionComponent } from './_components/edit-question/edit-question.component';
import { QuestionsTableModule } from './_components/questions-table/questions-table.module';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    QuestionsStoreModule,
    SharedUiCrtButtonsButtonComponent,
    QuestionItemComponent,
    EditQuestionComponent,
    RouterModule.forChild(questionsRoutes),
    GenericTableMaterialModule,
    QuestionsTableModule,
    // HttpClientModule,
    // QuestionsStateModule,
    // MatDialogModule,
    // ReactiveFormsModule,
    // InputModule,
    // FormFieldModule,
    // ButtonModule,
    // SelectModule,
    // GenericTableModule,
  ],
})
export class QuestionsModule {}
