import { FormGroup } from "@angular/forms";
import {
  IFieldViolation,
  ISerializedErrorResponse,
} from "../../types/error-response.types";

export function updateValueAndValidity(form: FormGroup) {
  Object.values(form.controls).forEach((control) => {
    control.markAllAsTouched({ emitEvent: true });
    control.markAllAsDirty({ emitEvent: true });
    control.updateValueAndValidity({ emitEvent: true });
  });
}

export function mapServerFormErrors(
  form: FormGroup,
  error: ISerializedErrorResponse,
) {
  const violations = error.details as IFieldViolation[];

  violations.forEach((fieldViolation) => {
    const formControl =
      form.controls[fieldViolation.field as keyof typeof form.controls];

    if (formControl) {
      formControl.setErrors(
        {
          serverError: fieldViolation.description,
        },
        { emitEvent: true },
      );
    }
  });
}
