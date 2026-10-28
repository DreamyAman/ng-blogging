import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-blank-layout",
  template: `<section class="container-fluid">
    <router-outlet />
  </section>`,
  imports: [RouterOutlet],
})
export class BlankLayout {}
