import { Routes } from "@angular/router";
import { MyPosts } from "../../features/my-posts/my-posts";
import { AllPosts } from "./all-posts/all-posts";
import { EditPost } from "./edit-post/edit-post";
import { ViewPost } from "./view-post/view-post";
import { unsavedChangesGuard } from "../../core/gaurds/can-deactivate.gaurds";

export const myPostChildren: Routes = [
    {path:'',redirectTo:'all-post',pathMatch:'full'},
    {path:'all-post',component:AllPosts},
    {path: 'edit-post/:id', component: EditPost,canDeactivate : [unsavedChangesGuard] },
    {path: 'view-post/:id', component: ViewPost },
]