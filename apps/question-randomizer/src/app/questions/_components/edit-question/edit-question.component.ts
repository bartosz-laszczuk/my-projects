import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  SharedUiCrtButtonsButtonComponent,
  SharedUiCrtControlsFormFieldComponent,
  SharedUiCrtControlsInputComponent,
  SharedUiCrtControlsSelectComponent,
} from '@my-projects/shared/ui-crt';
import { QuestionRandomizerConfirmDialogComponent } from '../../../core/_services/dialog/_components/confirm-dialog/question-randomizer-confirm-dialog.component';
import { markFormGroupTouched, regexErrors } from '../../../shared/utils';
import { QuestionsFacade } from '../../_store/questions.facade';
import { DictionariesFacade } from '../../../core/_store/dictionaries/dictionaries.facade';
import { Question } from '../../_models/frontend/question.model';

@Component({
  selector: 'my-projects-edit-question',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedUiCrtControlsFormFieldComponent,
    SharedUiCrtButtonsButtonComponent,
    SharedUiCrtControlsSelectComponent,
    SharedUiCrtControlsInputComponent,
    QuestionRandomizerConfirmDialogComponent,
  ],
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditQuestionComponent {
  form: UntypedFormGroup;
  regexErrors = regexErrors;
  categoryControlItems$ = this._dictionariesFacade.categoryControlItems$;
  qualificationControlItems$ =
    this._dictionariesFacade.qualificationControlItems$;

  constructor(
    private _fb: UntypedFormBuilder,
    private _questionsFacade: QuestionsFacade,
    private _dictionariesFacade: DictionariesFacade,
    private _dialogRef: MatDialogRef<EditQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: Question }
  ) {
    this.form = this._fb.group({
      question: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(128)],
        },
      ],
      answer: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      answerPl: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
      categoryId: [null, { validators: [Validators.required] }],
      qualificationId: [null],
      isActive: [null],
    });

    if (this.data.question) {
      this.form.patchValue(this.data.question);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.data.question) {
        const updatedQuestion = { ...this.data.question, ...this.form.value };
        this._questionsFacade.updateQuestion(updatedQuestion);
      } else {
        this._questionsFacade.createQuestion(this.form.value);
      }
      this.onClose();
    } else {
      markFormGroupTouched(this.form);
    }
  }

  onClose() {
    this._dialogRef.close();
  }
}
