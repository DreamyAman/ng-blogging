import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar.component";

@Component({
  selector: "app-feed",
  template: `<app-navbar /> <router-outlet />`,
  imports: [RouterOutlet, NavbarComponent],
})
export class FeedComponent {}
