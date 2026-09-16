import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { baseUrl } from "./url";
import { authService } from "./auth.service";
import { IPosts } from "../interfaces/posts.types";

@Injectable({
  providedIn: 'root'
})
export class MyPostService {
  baseUrl = baseUrl;
  http = inject(HttpClient);
  searchQuery = signal<string>('');
  page = signal<number>(1);

  userPosts() {
    const token = localStorage.getItem('accessToken') || '';
    return this.http.get<IPosts>(`${this.baseUrl}/blogs/search?page=${this.page()}&limit=20&q=${this.searchQuery()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
  
  getPost(id: string|null) {
    const token = localStorage.getItem('accessToken') || '';

    return this.http.get<any>(`${this.baseUrl}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePost(post:any) {
    const token = localStorage.getItem('accessToken') || '';

    return this.http.put(`${this.baseUrl}/blogs/${post.id}`,
      { title: post.title, content: post.content, },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateBlogStatus(status:any) {
    const token = localStorage.getItem('accessToken') || '';
    
    return this.http.patch(`${this.baseUrl}/blogs/${status.id}/status`,
      { "status": status.status},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  
  createBlog(blogData : any){
    const token = localStorage.getItem('accessToken') || '';
    return this.http.post(`${this.baseUrl}/blogs`,
      {"title": blogData.title,"content": blogData.content},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  deleteBlog(id:any) {
    const token = localStorage.getItem('accessToken') || '';
    
    return this.http.delete(`${this.baseUrl}/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

}