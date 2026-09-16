import { Routes } from "@angular/router";
import { PostComponent } from "./post/post";
import { PublicPosts } from "./public-posts/public-posts";

export const blogRoutes: Routes = [
    {path:'',redirectTo:'posts',pathMatch:'full'},
    {path:'posts',component:PostComponent},
    {path:'public-posts/:id',component:PublicPosts},
]