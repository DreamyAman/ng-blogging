import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { blogsService } from '../../core/services/blogs.service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe,RouterOutlet],
  selector: 'app-my-posts',
  styleUrl: './my-posts.css',
  templateUrl: './my-posts.html',
})
export class MyPosts {}
