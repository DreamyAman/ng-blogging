import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Notifications } from '../../core/services/notifications.service';

@Component({
  imports: [],
  selector: 'app-success',
  standalone: true,
  styleUrl: './success-component.css',
  templateUrl: './success-component.html',
})

export class SuccessComponent {

  success = signal<boolean>(false)
  notifications = inject(Notifications);
  successList = this.notifications.successList;
  
  constructor(){
    effect(()=>{
      this.success.set(this.successList().length > 0);
    })
  }
}
