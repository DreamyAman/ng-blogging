import { Component, inject, input, signal } from '@angular/core';
import { MyPostService } from '../../../core/services/my-posts.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, CanDeactivateFn, Router, RouterLink } from '@angular/router';
import { IPost } from '../../../core/interfaces/posts.types';
import { SuccessComponent } from '../../../shared/success-component/success-component';
import { ErrorComponent } from '../../../shared/error-component/error-component';
import { Notifications } from '../../../core/services/notifications.service';

@Component({
  imports: [RouterLink,ReactiveFormsModule],
  selector: 'app-edit-post',
  styleUrl: './edit-post.css',
  templateUrl: './edit-post.html',
})
export class EditPost {
  route = inject(ActivatedRoute);
  displayErrors = signal<string[]>([]); 
  displaySuccess = signal<string[]>([]); 
  router = inject(Router);
  myPostService = inject(MyPostService);
  currentStatus = signal<string>('');
  notifications = inject(Notifications);
  savedChanges = false

  id = this.route.snapshot.paramMap.get('id');

  editForm = new FormGroup({
    editTitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    editContent: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    console.log(this.id);
    if (!this.id) return;

    this.myPostService.getPost(this.id).subscribe({
      next: (result) => {
        this.editForm.get('editTitle')?.setValue(result.data.title);
        this.editForm.get('editContent')?.setValue(result.data.content);
        this.currentStatus.set(result.data.status);
      }
    });
  }

  updatePost() {
  this.displayErrors.set([]);
  if (this.editForm.invalid) {
    this.extractFormErrors();
     return;
  }

  console.log(this.editForm.value.editTitle,this.editForm.value.editContent);
  const editPostObj = {
      id : this.id,
      title : this.editForm.value.editTitle,
      content : this.editForm.value.editContent
    }
  this.myPostService.updatePost(editPostObj).subscribe({
    next:(result : any)=>{
      console.log('success' , result);
      this.displaySuccess.update(success=>['Changes Saved']);
      this.notifications.successBanner(this.displaySuccess());
      this.savedChanges = true;
      this.router.navigate(['/my-posts/all-post']);
    },
    error:(result : any)=>{
      console.log('error',result);
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

  extractFormErrors(){
    const form = this.editForm

    if(form.get('editTitle')?.hasError('required')){
      this.displayErrors.update(errors => [...errors, 'Title cannot be blank.']);
    }
    if(form.get('editContent')?.hasError('required')){
      this.displayErrors.update(errors => [...errors, 'Content cannot be blank.']);
    }
    this.notifications.errorBanner(this.displayErrors());
  }

  canDeactivate(){
    if(this.savedChanges === false && this.editForm.dirty){
      return confirm ('You have unsaved changes! Are you sure you want to leave?');
    }
    return true
  }

}