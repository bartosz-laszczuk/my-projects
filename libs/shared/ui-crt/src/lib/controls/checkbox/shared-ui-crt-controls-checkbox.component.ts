import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Value } from '../../models/control-item.model';

@Component({
  selector: 'my-projects-shared-ui-crt-controls-checkbox',
  templateUrl: './shared-ui-crt-controls-checkbox.component.html',
  styleUrls: ['./shared-ui-crt-controls-checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedUiCrtControlsCheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiCrtControlsCheckboxComponent
  implements ControlValueAccessor
{
  @Output() changed = new EventEmitter<Value>();

  public value: boolean = false;

  isDisabled = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private propagateChange: any = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.value = checked;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }
}
