import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { authService } from '../../../core/services/auth.service';
import { ErrorComponent } from '../../../shared/error-component/error-component'; 
import { Notifications } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule], 
  templateUrl: './sign-up.html',
})
export class SignUpComponent {
  notifications = inject(Notifications)
  submitted = false;
  router = inject(Router);
  authService = inject(authService);
  displayErrors = signal<string[]>([]); 

  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('',Validators.maxLength(10)),
  }, { updateOn: 'submit' }); 

onSignUp() {
    this.submitted = true;
    this.displayErrors.set([]);

    if (this.signUpForm.invalid) {
      this.extractFormErrors();
      return; 
    }

    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (result) => {
        console.log('Success!', result);
        this.authService.saveToken(result)
        this.authService.isLoggedIn.set(true);
        this.router.navigate(['/blogs']); 
        this.submitted = false;
        this.signUpForm.reset(); 
      },
      error: (errorResponse) => {

        if(errorResponse.error.error.code === 409){
        this.displayErrors.set([errorResponse.error.error.message]);
        }
        
        if(errorResponse.error.error.code === 400){
          const errors = errorResponse.error.error.details[1].fieldViolations
          errors.forEach((item:any)=> {
              this.displayErrors.update(errors => [...errors, item.description]);
          });
        }
      },
    });
  }

  private extractFormErrors() {
  const form = this.signUpForm;

  if (form.get('firstName')?.hasError('required')) {
    this.displayErrors.update(errors => [...errors, 'First name is required.']);
  }

  if (form.get('email')?.hasError('required')) {
    this.displayErrors.update(errors => [...errors, 'Email is required.']);
  } else if (form.get('email')?.hasError('email')) {
    this.displayErrors.update(errors => [...errors, 'Please enter a valid email address.']);
  }

  if (form.get('password')?.hasError('required')) {
    this.displayErrors.update(errors => [...errors, 'Password is required.']);
  } else if (form.get('password')?.hasError('minlength')) {
    this.displayErrors.update(errors => [...errors, 'Password must be at least 6 characters.']);
  }

  this.notifications.errorBanner(this.displayErrors());

}
}