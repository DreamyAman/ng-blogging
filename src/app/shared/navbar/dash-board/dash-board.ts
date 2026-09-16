import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Profile } from './profile/profile';
import { RedirectAuth } from './redirect-auth/redirect-auth';
import { authService } from '../../../core/services/auth.service';
import { NewPost } from '../../../features/new-post/new-post';
import { MyPostService } from '../../../core/services/my-posts.service';
import { CreateBlog } from './create-blog/create-blog';

@Component({
  imports: [Profile,RedirectAuth,CreateBlog],
  selector: 'app-dashboard',
  templateUrl: './dash-board.html',
})
export class DashBoard{
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
        this.profileInfo.set(result);
        this.authService.isLoggedIn.set(true);
        this.giveUsername(result)
      },
      error:(err)=>{
        console.log('no tokken found',err);
      }
    })
  }

  giveUsername(result:any){
    this.userName = `${result.data.firstName} ${result.data.lastName} `
  }
}
