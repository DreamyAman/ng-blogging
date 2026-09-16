import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MyPostService } from '../../../core/services/my-posts.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-public-posts',
  styleUrl: './public-posts.css',
  templateUrl: './public-posts.html',
})
export class PublicPosts {
  route = inject(ActivatedRoute);
  router = inject(Router);
  myPostService = inject(MyPostService);
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
        this.getPost()
      },
      error:(result)=>{
        console.log("error",result);
      }
    })
    
  }
}
