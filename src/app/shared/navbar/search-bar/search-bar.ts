import { Component, inject } from '@angular/core';
import { blogsService } from '../../../core/services/blogs.service';
import { MyPostService } from '../../../core/services/my-posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  route = inject(ActivatedRoute);
  blogService = inject(blogsService);
  myPostService = inject(MyPostService)

  searchQuery(searchInput:HTMLInputElement){
    this.blogService.searchQuery.set(searchInput.value);
    this.blogService.guestPosts();  
    this.myPostService.searchQuery.set(searchInput.value);
  }
  
}
