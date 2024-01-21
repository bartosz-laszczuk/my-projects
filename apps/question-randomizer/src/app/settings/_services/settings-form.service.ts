import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsForm } from '../_models/settings-form.model';
import { Language } from '../../core/_enums/language.enum';
import { Settings } from '../_models/settings.model';

@Injectable()
export class SettingsFormService {
  private _fb: FormBuilder = inject(FormBuilder);
  public settingsForm?: FormGroup<SettingsForm>;

  public initForm(settings: Settings) {
    this.settingsForm = this._fb.group<SettingsForm>({
      language: this._fb.control<Language>(settings.language, {
        nonNullable: true,
      }),
      animationsEnabled: this._fb.control<boolean>(settings.animationsEnabled, {
        nonNullable: true,
      }),
      interviewMode: this._fb.control<boolean>(settings.interviewMode, {
        nonNullable: true,
      }),
    });
  }
}
