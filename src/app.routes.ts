import { authRoutes } from "./app/features/authorization/auth.routes";
import { Routes } from "@angular/router";
import { BlogsComponent } from "./app/features/blogs/blogs";
import { authGuard } from "./app/core/gaurds/auth.gaurd";
import { blogRoutes } from "./app/features/blogs/blogs.routes";
import { navRoutes } from "./app/shared/navbar/navbar.routes";

export const routes: Routes = [
    {path: '',redirectTo: 'blogs',pathMatch:'full'},
    ...authRoutes, 
    {path: 'blogs', component : BlogsComponent,children:blogRoutes},
    ...navRoutes,
]