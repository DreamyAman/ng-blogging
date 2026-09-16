import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Notifications{
    
  errorList = signal<[]>([]) ;
  successList = signal<[]>([]) ;
  
  errorBanner(errors:any){
    this.errorList.set(errors);
    setTimeout(()=>{
        this.errorList.set([]);
    },5000)
  }
  successBanner(success:any){
    this.successList.set(success);
    setTimeout(()=>{
        this.successList.set([]);
    },5000)
  }

}