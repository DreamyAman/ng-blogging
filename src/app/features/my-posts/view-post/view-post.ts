import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyPostService } from '../../../core/services/my-posts.service';
import { DatePipe } from '@angular/common';
import { Notifications } from '../../../core/services/notifications.service';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-view-post',
  styleUrl: './view-post.css',
  templateUrl: './view-post.html',
})
export class ViewPost {
  route = inject(ActivatedRoute);
  router = inject(Router);
  myPostService = inject(MyPostService);
  displayErrors = signal<string[]>([]);
  displaySuccess = signal<string[]>([]);
  notifications = inject(Notifications)
  id = this.route.snapshot.paramMap.get('id');

  response = signal<any>({})

  title = signal<string>('')
  content = signal<string>('')
  name = signal<string>('')
  date = signal<string>('')

  constructor() {
    console.log(this.id);
    if (!this.id) return;
    this.getPost();
  }

  getPost(){
    this.myPostService.getPost(this.id).subscribe({
      next: (result) => {
        this.response.set(result.data)
        this.title.set(result.data.title,)
        this.content.set(result.data.content)
        this.date.set(result.data.updatedAt)
        this.name.set(`${result.data.authorId.firstName} ${result.data.authorId.lastName}`)
      }
    });
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
        if(status==="DRAFT"){
        this.displaySuccess.update(success=>['Your Post Is Now In Draft' ])
        this.notifications.successBanner(this.displaySuccess());
        }
        if(status==="ARCHIVED"){
        this.displaySuccess.update(success=>['Your Post has been Archived.' ])
        this.notifications.successBanner(this.displaySuccess());
        }
        this.getPost()
      },
      error:(result)=>{
        console.log("error",result);
      }
    })
    
  }

  deletePost(){
    this.myPostService.deleteBlog(this.id).subscribe({
      next:(result)=>{
        console.log('success',result);
        this.router.navigate(['/my-posts/all-post']);
      },
      error:(err)=>{
        console.log('error',err);
      }
    })
  }
}
