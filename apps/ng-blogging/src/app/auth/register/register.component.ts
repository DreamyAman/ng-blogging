import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  FormFieldError,
  IFormFieldsErrors,
} from "../../common/form/components/form-field-error";
import { NgClass } from "@angular/common";
import {
  mapServerFormErrors,
  updateValueAndValidity,
} from "../../common/form/utils/form.utils";
import { ICreateUserRequest } from "../types";
import { ErrorStatus, ISerializedErrorResponse } from "../../common/types";
import { Router, RouterLink } from "@angular/router";
import { startWithTap } from "../../common/rxjs/operators";
import { AuthService } from "../services/auth.service";
import { AlertService } from "../../common/alert/services";

@Component({
  imports: [ReactiveFormsModule, FormFieldError, NgClass, RouterLink],
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  public router = inject(Router);

  protected readonly registerForm = this.fb.group({
    firstName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
      ]),
    ],
    lastName: [
      null,
      Validators.compose([Validators.minLength(2), Validators.maxLength(20)]),
    ],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    ],
    phone: [null, Validators.compose([Validators.pattern(/\d{10,10}/)])],
    terms: [false, Validators.requiredTrue],
  });

  public readonly formErrorMessages: IFormFieldsErrors = {
    firstName: [
      { type: "required", message: "First name is required." },
      { type: "minlength", message: "Minimum length is 2." },
      { type: "maxlength", message: "Maximum length is 24." },
    ],
    lastName: [
      { type: "minlength", message: "Minimum length is 2." },
      { type: "maxlength", message: "Maximum length is 20." },
    ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "email", message: "Must be a valid email address." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum length is 6." },
      { type: "maxlength", message: "Maximum length is 10." },
    ],
    phone: [{ type: "pattern", message: "Phone must be of 10 digits." }],
    terms: [{ type: "required", message: "You must agree before submitting." }],
  };

  protected isSubmitting = signal(false);

  private readonly auth = inject(AuthService);

  private readonly alert = inject(AlertService);

  protected onSubmit() {
    if (this.registerForm.invalid) {
      updateValueAndValidity(this.registerForm);
      return;
    }

    const registerReq = this.registerForm
      .value as unknown as ICreateUserRequest;

    this.auth
      .register(registerReq)
      .pipe(
        startWithTap(() => {
          this.registerForm.disable();
          this.isSubmitting.set(true);
        }),
      )
      .subscribe({
        next: () => this.router.navigate(["/feed"]),
        error: (error: ISerializedErrorResponse) =>
          this.handleServerErrorResp(error),
      });
  }

  private handleServerErrorResp(error: ISerializedErrorResponse) {
    {
      this.registerForm.enable();
      this.isSubmitting.set(false);

      switch (error.status) {
        case ErrorStatus.INVALID_ARGUMENT:
          mapServerFormErrors(this.registerForm, error);
          break;

        case ErrorStatus.ALREADY_EXISTS:
          this.handleAlreadyExistsEmailError(error.message);
          break;

        default:
          this.alert.error("Failed", error.message);
          break;
      }
    }
  }

  private handleAlreadyExistsEmailError(message: string) {
    this.registerForm.controls.email.setErrors(
      {
        alreadyExists: message,
      },
      { emitEvent: true },
    );
  }
}
