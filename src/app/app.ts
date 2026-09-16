import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { ErrorComponent } from './shared/error-component/error-component';
import { SuccessComponent } from './shared/success-component/success-component';

@Component({
  imports: [RouterOutlet,Navbar,ErrorComponent,SuccessComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class AppComponent {}
