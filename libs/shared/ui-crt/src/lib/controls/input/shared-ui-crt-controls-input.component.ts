import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'my-projects-shared-ui-crt-controls-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui-crt-controls-input.component.html',
  styleUrls: ['./shared-ui-crt-controls-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedUiCrtControlsInputComponent),
      multi: true,
    },
  ],
})
export class SharedUiCrtControlsInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Output() changed = new EventEmitter<string>();
  value = '';
  isDisabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private propagateChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private propagateTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(event: any): void {
    this.value = event.target.value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
