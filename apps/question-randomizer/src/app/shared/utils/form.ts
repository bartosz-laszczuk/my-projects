import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import {
  ControlItem,
  DictionaryItem,
} from '@my-projects-nx/question-randomizer/shared/util/models/frontend';

export const markFormGroupTouched = (formGroup: any) => {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    control.markAsTouched();

    if (control.controls) {
      markFormGroupTouched(control);
    }
  });
};

export const dictionaryItemToControlItem = (
  x: DictionaryItem
): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon,
});

export interface Control {
  items?: ControlItem[];
  changed?: () => void;
  map?: () => void;
}

export interface ControlEntities {
  [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
  Object.keys(controls).forEach((key) => {
    if (controls[key].map) {
      controls[key].map!();
    }
  });
};

export const asFormArray = (control: AbstractControl): UntypedFormArray =>
  control as UntypedFormArray;

export const asFormGroup = (control: AbstractControl): UntypedFormGroup =>
  control as UntypedFormGroup;
