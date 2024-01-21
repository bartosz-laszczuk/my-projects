import { FormControl } from '@angular/forms';
import { Language } from '../../core/_enums/language.enum';

export interface SettingsForm {
  language: FormControl<Language>;
  animationsEnabled: FormControl<boolean>;
  interviewMode: FormControl<boolean>;
}
