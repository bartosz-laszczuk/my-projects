import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'my-projects-shared-ui-crt-controls-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui-crt-controls-form-field.component.html',
  styleUrls: ['./shared-ui-crt-controls-form-field.component.scss'],
  // TODO
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtControlsFormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() isInline: boolean;
  @Input() control: AbstractControl | undefined;
  @Input() patternError = '';
  @Input() isValidationHidden = false;

  constructor() {
    this.isInline = false;
  }

  hasError(): boolean | undefined {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return (
      this.control && this.control.errors && Object.keys(this.control.errors)[0]
    );
  }
}
