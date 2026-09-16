import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  profileInfo = input<any>({});
  userName = input<string>('');
  
  showProfile(){
    console.log(this.profileInfo());
  }

}
