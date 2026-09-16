import { Component, effect, inject, signal } from '@angular/core';
import { authService } from '../../core/services/auth.service';

@Component({
  imports: [],
  selector: 'app-profile-info',
  styleUrl: './profile-info.css',
  templateUrl: './profile-info.html',
})
export class ProfileInfo {
  authService = inject(authService);
  profileInfo = signal<any>({});
  userName = '';

  constructor(){
    effect(() => {
      if (this.authService.isLoggedIn()) {
        this.fetchProfile();
      } else {
        this.profileInfo.set({});
      }
    });
  }
  fetchProfile(){
    this.authService.getProfile().subscribe({
      next:(result)=>{
        this.profileInfo.set(result.data);
      },
      error:(err)=>{
        console.log('no tokken found',err);
      }
    })
  }

  logout(){
    this.authService.logout();
  }
}
