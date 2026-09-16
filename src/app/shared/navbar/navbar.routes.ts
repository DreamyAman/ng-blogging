import { Routes } from "@angular/router";
import { MyPosts } from "../../features/my-posts/my-posts";
import { myPostChildren } from "../../features/my-posts/my-posts.routes";
import { createBlogRoutes } from "../../features/new-post/create-blog.routes";
import { authGuard } from "../../core/gaurds/auth.gaurd";
import { publicInfoRoutes } from "../../features/profile-info/profile-info.routes";

export const navRoutes: Routes = [
    {path:'my-posts',component:MyPosts,children:myPostChildren,canActivate:[authGuard]},
    ...createBlogRoutes,
    ...publicInfoRoutes
]