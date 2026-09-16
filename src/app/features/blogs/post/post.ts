import { Component, inject, signal } from '@angular/core';
import { blogsService } from '../../../core/services/blogs.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-post',
  styleUrl: './post.css',
  templateUrl: './post.html',
})
export class PostComponent {
  blogsService = inject(blogsService);
  post = this.blogsService.postData;
  page = this.blogsService.page;

  constructor(){
    this.blogsService.guestPosts();
  }

  nextPage(){
    this.page.update(page => page + 1)
    this.blogsService.guestPosts();
  }

  prevPage(){
    this.page.update(page => page - 1)
    this.blogsService.guestPosts();
  }

  checkPageAvailble(direction:'next'|'prev'){
    if (direction==='next'){
      return !!this.post()?.hasNextPage
    }
    return !!this.post()?.hasPrevPage
  }

}
