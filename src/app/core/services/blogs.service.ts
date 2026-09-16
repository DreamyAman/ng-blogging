import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { baseUrl } from "./url";
import { authService } from "./auth.service";
import { IPosts } from "../interfaces/posts.types";

@Injectable({
    providedIn:'root'
})
export class blogsService{
    baseUrl = baseUrl
    http = inject(HttpClient);
    postData = signal<IPosts | undefined>(undefined);
    searchQuery = signal<string>('');
    page = signal<number>(1);

    guestPosts(){
        this.http.get<IPosts>(`${this.baseUrl}/blogs/search?page=${this.page()}&limit=3&q=${this.searchQuery()}`).subscribe({
            next:(result)=>{
                this.postData.set(result);
            }
        })
    }
}
