import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Notifications } from '../../core/services/notifications.service';

@Component({
  imports: [],
  selector: 'app-error',
  standalone: true,
  styleUrl: './error-component.css',
  templateUrl: './error-component.html',
})

export class ErrorComponent {
  
  errors = signal<boolean>(false)
  notifications = inject(Notifications);
  errorList = this.notifications.errorList;
  
  constructor(){
    effect(()=>{
      this.errors.set(this.errorList().length > 0);
    })
  }

}
