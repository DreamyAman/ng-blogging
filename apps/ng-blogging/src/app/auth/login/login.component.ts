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
import { ILoginRequest } from "../types";
import { ErrorStatus, ISerializedErrorResponse } from "../../common/types";
import { Router, RouterLink } from "@angular/router";
import { startWithTap } from "../../common/rxjs/operators";
import { AuthService } from "../services/auth.service";
import { AlertService } from "../../common/alert/services";

@Component({
  imports: [ReactiveFormsModule, FormFieldError, NgClass, RouterLink],
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  public router = inject(Router);

  protected readonly loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    ],
    keepLoggedIn: [false, Validators.required],
  });

  public readonly formErrorMessages: IFormFieldsErrors = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "email", message: "Must be a valid email address." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum length is 6." },
      { type: "maxlength", message: "Maximum length is 10." },
    ],
  };

  protected isSubmitting = signal(false);

  private readonly auth = inject(AuthService);

  private readonly alert = inject(AlertService);

  protected onSubmit() {
    if (this.loginForm.invalid) {
      updateValueAndValidity(this.loginForm);
      return;
    }

    const loginReq = this.loginForm.value as unknown as ILoginRequest;

    this.auth
      .login(loginReq)
      .pipe(
        startWithTap(() => {
          this.loginForm.disable();
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
      this.loginForm.enable();
      this.isSubmitting.set(false);

      switch (error.status) {
        case ErrorStatus.INVALID_ARGUMENT:
          mapServerFormErrors(this.loginForm, error);
          break;

        case ErrorStatus.UNAUTHENTICATED:
          this.handleUnauthError(error.message);
          break;

        default:
          this.alert.error("Failed", error.message);
          break;
      }
    }
  }

  private handleUnauthError(message: string) {
    this.alert.error("Unauthorized", message);
  }
}
