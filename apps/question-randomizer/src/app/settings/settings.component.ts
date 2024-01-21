import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SettingsFormService } from './_services/settings-form.service';
import { SettingsService } from './_services/settings.service';
import { NgIf } from '@angular/common';
import {
  SharedUiCrtControlsCheckboxComponent,
  SharedUiCrtControlsFormFieldComponent,
  SharedUiCrtLayoutDisplayService,
} from '@my-projects/shared/ui-crt';
import { Settings } from './_models/settings.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsForm } from './_models/settings-form.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'my-projects-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    SharedUiCrtControlsFormFieldComponent,
    SharedUiCrtControlsCheckboxComponent,
  ],
  providers: [SettingsFormService],
})
export class SettingsComponent implements OnInit {
  private _settingsService: SettingsService = inject(SettingsService);
  private _crtLayoutDisplayService: SharedUiCrtLayoutDisplayService = inject(
    SharedUiCrtLayoutDisplayService
  );
  private _destroy$: Subject<void> = new Subject<void>();
  public settingsFormService: SettingsFormService = inject(SettingsFormService);

  public ngOnInit(): void {
    this.initForm();
    this.initFormOnChangeSubscriptions(this.settingsFormService.settingsForm!);
  }

  private initForm() {
    const settings: Settings = {
      language: this._settingsService.language$.value,
      animationsEnabled: this._crtLayoutDisplayService.animationsEnabled$.value,
      interviewMode: this._settingsService.interviewMode$.value,
    };
    this.settingsFormService.initForm(settings);
  }

  private initFormOnChangeSubscriptions(settingsForm: FormGroup<SettingsForm>) {
    settingsForm.controls.language.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => this._settingsService.setLanguage(value));
    settingsForm.controls.interviewMode.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => this._settingsService.setInterviewMode(value));
    settingsForm.controls.animationsEnabled.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) =>
        this._crtLayoutDisplayService.setAnimationsEnabled(value)
      );
  }
}
