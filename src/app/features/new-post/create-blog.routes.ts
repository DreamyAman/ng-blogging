import { Routes } from "@angular/router";
import { NewPost } from "./new-post";
import { authGuard } from "../../core/gaurds/auth.gaurd";
import { unsavedChangesGuard } from "../../core/gaurds/can-deactivate.gaurds";

export const createBlogRoutes: Routes = [
    {path:'new-post',component: NewPost,canActivate: [authGuard],canDeactivate:[unsavedChangesGuard]},
]