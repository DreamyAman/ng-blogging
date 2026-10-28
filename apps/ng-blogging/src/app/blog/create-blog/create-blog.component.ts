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
  selector: "app-create-blog",
  templateUrl: "./create-blog.component.html",
})
export class CreateBlogComponent {
  private readonly fb = inject(FormBuilder);

  public router = inject(Router);

  protected readonly blogForm = this.fb.group({
    title: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24),
      ]),
    ],
    content: [
      null,
      Validators.compose([Validators.minLength(2), Validators.maxLength(200)]),
    ],
  });

  public readonly formErrorMessages: IFormFieldsErrors = {
    title: [
      { type: "required", message: "Title is required." },
      { type: "minlength", message: "Minimum length is 2." },
      { type: "maxlength", message: "Maximum length is 24." },
    ],
    content: [
      { type: "required", message: "Content is required." },
      { type: "minlength", message: "Minimum length is 2." },
      { type: "maxlength", message: "Maximum length is 200." },
    ],
  };

  protected isSubmitting = signal(false);

  private readonly auth = inject(AuthService);

  private readonly alert = inject(AlertService);

  protected onSubmit() {
    if (this.blogForm.invalid) {
      updateValueAndValidity(this.blogForm);
      return;
    }

    const registerReq = this.blogForm.value as unknown as ICreateUserRequest;

    this.auth
      .register(registerReq)
      .pipe(
        startWithTap(() => {
          this.blogForm.disable();
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
      this.blogForm.enable();
      this.isSubmitting.set(false);

      switch (error.status) {
        case ErrorStatus.INVALID_ARGUMENT:
          mapServerFormErrors(this.blogForm, error);
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
    this.blogForm.controls.email.setErrors(
      {
        alreadyExists: message,
      },
      { emitEvent: true },
    );
  }
}
