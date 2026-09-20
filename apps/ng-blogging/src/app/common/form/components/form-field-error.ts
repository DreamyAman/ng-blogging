import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  OnInit,
  computed,
  contentChild,
  TemplateRef,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  AbstractControl,
  FormGroupDirective,
  ReactiveFormsModule,
} from "@angular/forms";

export interface IFormFieldError {
  type: string;
  message: string;
}

export interface IFormFieldsErrors {
  [controlName: string]: IFormFieldError[];
}

@Component({
  imports: [ReactiveFormsModule, NgTemplateOutlet],
  selector: "app-form-field-error",
  template: `
    @if (errorMessage()) {
      <ng-container
        [ngTemplateOutlet]="projectedContent()"
        [ngTemplateOutletContext]="{ error: errorMessage }"
      ></ng-container>
    }
  `,
})
export class FormFieldError implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  public readonly controlName = input.required<string>();

  public readonly formErrorMessages = input.required<IFormFieldsErrors>();

  private readonly formGroup = inject(FormGroupDirective);

  private formControl!: AbstractControl;

  protected errorMessage = signal<null | string>(null);

  public isInvalid = computed(() => !!this.errorMessage());

  protected projectedContent = contentChild(TemplateRef);

  ngOnInit(): void {
    const formControl = this.formGroup.control.get(this.controlName());

    if (!formControl) {
      return;
    }

    this.formControl = formControl;

    this.formControl.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.validate());
  }

  private validate() {
    if (this.formControl.valid) {
      this.errorMessage.set(null);
      return;
    }

    if (!this.formControl.touched && !this.formControl.dirty) {
      return;
    }

    const formFieldErrors = this.formErrorMessages()[this.controlName()];

    for (const error of formFieldErrors || []) {
      if (this.formControl.hasError(error.type)) {
        this.errorMessage.set(error.message);

        return;
      }
    }
  }
}
