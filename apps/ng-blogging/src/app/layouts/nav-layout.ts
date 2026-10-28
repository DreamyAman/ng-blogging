import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: "app-nav-layout",
  template: ` <app-navbar></app-navbar>
    <section class="container-fluid">
      <router-outlet />
    </section>`,
  imports: [RouterOutlet, NavbarComponent],
})
export class NavLayout {}
