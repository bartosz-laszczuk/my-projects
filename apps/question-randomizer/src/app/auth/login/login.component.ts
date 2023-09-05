import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getIsLoading } from '../../core/_store/dictionaries/dictionaries.selectors';
import { markFormGroupTouched, regex, regexErrors } from '../../shared/utils';
import { EmailPasswordCredentials } from '../../core/_models/backend/user/email-password-credentials.model';
import { signInEmail } from '../_store/user/user.actions';
import { CommonModule } from '@angular/common';
import {
  SharedUiCrtButtonsButtonComponent,
  SharedUiCrtControlsFormFieldComponent,
  SharedUiCrtControlsInputComponent,
  SharedUiCrtControlsPasswordComponent,
  SharedUiCrtIndicatorsSpinnerComponent,
} from '@my-projects/shared/ui-crt';

@Component({
  selector: 'my-projects-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiCrtControlsFormFieldComponent,
    SharedUiCrtControlsInputComponent,
    SharedUiCrtControlsPasswordComponent,
    SharedUiCrtButtonsButtonComponent,
    SharedUiCrtIndicatorsSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loading$: Observable<boolean | null> = this.store.pipe(select(getIsLoading));

  form: UntypedFormGroup;
  regexErrors = regexErrors;

  constructor(private _fb: UntypedFormBuilder, private store: Store) {
    this.form = this._fb.group({
      email: [
        null,
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.maxLength(128),
            Validators.pattern(regex.email),
          ],
        },
      ],
      password: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value;

      const credentials: EmailPasswordCredentials = {
        email: value.email,
        password: value.password,
      };
      this.store.dispatch(signInEmail({ credentials }));
    } else {
      markFormGroupTouched(this.form);
    }
  }
}
