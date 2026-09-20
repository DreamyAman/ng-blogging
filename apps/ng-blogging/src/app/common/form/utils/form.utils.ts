import { FormGroup } from "@angular/forms";

export function updateValueAndValidity(form: FormGroup) {
  Object.values(form.controls).forEach((control) => {
    control.markAllAsTouched({ emitEvent: true });
    control.markAllAsDirty({ emitEvent: true });
    control.updateValueAndValidity({ emitEvent: true });
  });
}
