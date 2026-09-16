import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login";
import { SignUpComponent } from "./sign-up/sign-up";
import { authGuard, loginUrlGuard } from "../../core/gaurds/auth.gaurd";

export const authRoutes: Routes = [
    {path:'login',component:LoginComponent , canActivate:[loginUrlGuard]},
    {path:'signUp',component:SignUpComponent , canActivate:[loginUrlGuard]},
]