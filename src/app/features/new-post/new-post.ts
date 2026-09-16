import { Component, inject, signal } from '@angular/core';
import { MyPostService } from '../../core/services/my-posts.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorComponent } from '../../shared/error-component/error-component';
import { Notifications } from '../../core/services/notifications.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule, ErrorComponent],
  selector: 'app-new-post',
  styleUrl: './new-post.css',
  templateUrl: './new-post.html',
})
export class NewPost {
  router = inject(Router);
  myPostService = inject(MyPostService);
  displayErrors = signal<string[]>([]);
  displaySuccess = signal<string[]>([]);
  notifications = inject(Notifications)
  savedChanges = false;


  newPostForm = new FormGroup({
    title : new FormControl('',Validators.required),
    content : new FormControl('',Validators.required)
  })

  newPost(){
    this.displayErrors.set([]);
    if(this.newPostForm.invalid){
      this.extractFormErrors();
      return;
    }
    const createBlogObj = {
      title : this.newPostForm.value.title,
      content : this.newPostForm.value.content
    }
    this.myPostService.createBlog(createBlogObj).subscribe({
      next:(result)=>{
        this.displaySuccess.update(success=>['Draft has been Saved.' ])
        this.notifications.successBanner(this.displaySuccess());
        this.savedChanges = true;
        this.router.navigate(['/my-posts/all-post']);
        console.log('success' ,result);
      },
      error:(err)=>{
        console.log('error',err);
      }
    })

  }

  extractFormErrors(){
    const form = this.newPostForm;
    if (form.get('title')?.hasError('required')) {
      this.displayErrors.update(errors => [...errors, "Title can't be empty"]);
    }
    if (form.get('content')?.hasError('required')) {
      this.displayErrors.update(errors => [...errors, "Content can't be empty"]);
    }
    this.notifications.errorBanner(this.displayErrors());
  }

  canDeactivate(){
    if(this.savedChanges === false && this.newPostForm.dirty){
      return confirm ('You have unsaved changes! Are you sure you want to leave?');
    }
    return true
  }
}
