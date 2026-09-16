import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IloginResponse, IRequestTokenSuccess } from "../interfaces/auth.types";
import { Observable } from "rxjs";
import { baseUrl } from "./url";
import { ProfileResponse } from "../interfaces/profile.type";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class authService{
    private baseUrl = baseUrl
    http = inject(HttpClient);
    router = inject(Router);
    accessToken = localStorage.getItem('accessToken') || '';
    isLoggedIn = signal<boolean>(!!this.accessToken);
    timer :any;

    constructor(){
        if(this.isLoggedIn()===true){
            this.refreshTokenTimer();
        }
    }

    login(data:any):Observable<IloginResponse>{
        return this.http.post<IloginResponse>(`${this.baseUrl}/auth/login`,data)
    }
    signUp(data:any){
        return this.http.post(`${this.baseUrl}/auth/register`,data)
    }
    saveToken(response:any){
        this.accessToken = response?.data?.accessToken;
        localStorage.setItem('accessToken',this.accessToken);
        localStorage.setItem('userId', response?.data?.user?.id);
        this.isLoggedIn.set(true);
        this.refreshTokenTimer();
    }
    getProfile():Observable<ProfileResponse>{
        const token = localStorage.getItem('accessToken') || '';
        return this.http.get<ProfileResponse>(`${this.baseUrl}/profile`, {
            headers: { Authorization: `Bearer ${token}` } 
        });
    }
    
    refreshTokenTimer(){
        clearInterval(this.timer);

        this.timer = setInterval(()=>{
            this.http.post<IRequestTokenSuccess>(`${this.baseUrl}/auth/refresh-token`,{}).subscribe({
            next:(response:IRequestTokenSuccess)=>{
                this.accessToken = response?.data?.accessToken
                localStorage.setItem('accessToken',this.accessToken)
            },
            error:(err)=>{
                this.logout();
            }
            })
        },4)
    }

    logout(){
        clearInterval(this.timer);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        this.accessToken = '';
        this.isLoggedIn.set(false);
        this.router.navigate(['/login']);
    }
}
