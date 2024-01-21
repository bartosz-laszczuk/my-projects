import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ControlItem, Value } from '../../models/control-item.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'my-projects-shared-ui-crt-controls-radios',
  templateUrl: './shared-ui-crt-controls-radios.component.html',
  styleUrls: ['./shared-ui-crt-controls-radios.component.scss'],
  standalone: true,
  imports: [NgFor],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedUiCrtControlsRadiosComponent),
      multi: true,
    },
  ],
})
export class SharedUiCrtControlsRadiosComponent
  implements ControlValueAccessor
{
  @Input() items: ControlItem[] | undefined;

  @Output() changed = new EventEmitter<Value>();

  public value: Value | undefined;
  public isDisabled: boolean = false;

  private propagateChange: any = () => {};

  writeValue(value: Value): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  isChecked(value: Value): boolean {
    return this.value === value;
  }
}
