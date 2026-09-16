import { Routes } from "@angular/router";
import { authGuard } from "../../core/gaurds/auth.gaurd";
import { ProfileInfo } from "./profile-info";

export const publicInfoRoutes: Routes = [
    {path:'profile-info',component: ProfileInfo,canActivate: [authGuard]},
]