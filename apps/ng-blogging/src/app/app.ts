import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AlertComponent } from "./common/alert/components/alert.component";

@Component({
  imports: [RouterOutlet, AlertComponent],
  selector: "app-root",
  template: `<app-alert /> <router-outlet></router-outlet>`,
})
export class App {}
