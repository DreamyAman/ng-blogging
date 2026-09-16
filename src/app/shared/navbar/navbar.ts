import { Component, inject } from '@angular/core';
import { SearchBar } from './search-bar/search-bar';
import { Router, RouterLink } from '@angular/router';
import { DashBoard } from './dash-board/dash-board';
import { authService } from '../../core/services/auth.service';
import { MyPosts } from '../../features/my-posts/my-posts';

@Component({
  imports: [SearchBar, RouterLink,DashBoard],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(authService);
}
