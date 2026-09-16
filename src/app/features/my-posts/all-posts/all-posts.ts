import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { blogsService } from '../../../core/services/blogs.service';
import { DatePipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MyPostService } from '../../../core/services/my-posts.service';
import { Notifications } from '../../../core/services/notifications.service';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-all-posts',
  styleUrl: './all-posts.css',
  templateUrl: './all-posts.html',
})
export class AllPosts {
  myPostService = inject(MyPostService);
  displayErrors = signal<string[]>([]);
  displaySuccess = signal<string[]>([]);
  notifications = inject(Notifications)
  router = inject(Router);
  userPosts = signal<any[]>([]);
  id = input<string>('');

  constructor(){
    effect(() => {
      this.myPostService.searchQuery();
      this.getUserPosts();
    });
  }

  getUserPosts(){
    this.myPostService.userPosts().subscribe({
      next:(result)=>{
        this.userPosts.set(result.data);
        console.log(this.userPosts());
      }
    })
  }

  updateBlogStatus(id:any,status : string){ 
    this.id = id;
    const statusObj = {
      id : id,
      status : status
    }
    this.myPostService.updateBlogStatus(statusObj).subscribe({
      next:(result)=>{
        console.log("success",result);
        if(status==="PUBLISHED"){
        this.displaySuccess.update(success=>['Your Post Is Now Public.' ])
        this.notifications.successBanner(this.displaySuccess());
        }
        if(status==="ARCHIVED"){
        this.displaySuccess.update(success=>['Your Post has been Archived.' ])
        this.notifications.successBanner(this.displaySuccess());
        }
        this.getUserPosts();
      },
      error:(result)=>{
        console.log("error",result);
      }
    })
    
  }

  showPosts(postType:any){
    
  }
  
}
