import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { authService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IloginResponse } from '../../../core/interfaces/auth.types';
import { ErrorComponent } from '../../../shared/error-component/error-component';
import { Notifications } from '../../../core/services/notifications.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(authService);
  notifications = inject(Notifications)
  displayErrors = signal<string[]>([]);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  }, { updateOn: 'submit' });

  onLogin() {
    this.displayErrors.set([]);

    if (this.loginForm.invalid) {
      this.extractFormErrors();
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData).subscribe({
      next: (result: IloginResponse) => {
        console.log('Success', result);
        this.authService.saveToken(result);
        this.authService.isLoggedIn.set(true);
        this.router.navigate(['/blogs']);
      },
      error: (errorResponse) => {
        console.log(errorResponse.error.error.message);
        this.displayErrors.set([errorResponse.error.error.message]);
        this.notifications.errorBanner(this.displayErrors())
      }
    });
  }

  private extractFormErrors() {
    const form = this.loginForm;
    const errors: string[] = []; 

    if (form.get('email')?.hasError('required')) {
      errors.push('Email is required.');
    } else if (form.get('email')?.hasError('email')) {
      errors.push('Please enter a valid email address.');
    }
    
    if (form.get('password')?.hasError('required')) {
      errors.push('Password is required.');
    }

    this.displayErrors.set(errors);
    this.notifications.errorBanner(this.displayErrors());

  }
}