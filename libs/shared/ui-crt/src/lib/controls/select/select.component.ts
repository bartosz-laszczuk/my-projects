// import {
//   Component,
//   OnInit,
//   Input,
//   Output,
//   EventEmitter,
//   forwardRef,
// } from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// import { MatSelectChange } from '@angular/material/select';
// import {
//   ControlItem,
//   Value,
// } from '@question-randomizer/app/core/_models/frontend';

// @Component({
//   selector: 'app-select',
//   templateUrl: './select.component.html',
//   styleUrls: ['./select.component.scss'],
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => SelectComponent),
//       multi: true,
//     },
//   ],
// })
// export class SelectComponent implements ControlValueAccessor {
//   @Input() items: ControlItem[] | undefined;
//   @Input() placeholder: string;
//   @Output() changed = new EventEmitter<Value>();

//   value: Value;
//   isDisabled = false;

//   private propagateChange: any = () => {};
//   private propagateTouched: any = () => {};

//   writeValue(value: Value): void {
//     this.value = value;
//   }

//   registerOnChange(fn: any): void {
//     this.propagateChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.propagateTouched = fn;
//   }

//   setDisabledState(isDisabled: boolean): void {
//     this.isDisabled = isDisabled;
//   }

//   onChanged(event: MatSelectChange): void {
//     const value = event.value ? event.value : null;

//     this.value = value;
//     this.propagateChange(value);
//     this.changed.emit(value);
//   }

//   onBlur(): void {
//     this.propagateTouched();
//   }
// }
