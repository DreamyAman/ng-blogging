import { Component, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AlertComponent } from "./common/alert/components/alert.component";
import { AlertService } from "./common/alert/services";

@Component({
  imports: [RouterOutlet, AlertComponent],
  selector: "app-root",
  template: `<app-alert /> <router-outlet></router-outlet>`,
})
export class App implements OnInit {
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    throw new Error("Unimplemented");
    // const courseAlertRef = this.alertService.open({
    //   type: AlertType.SUCCESS,
    //   title: "Hello world",
    //   message: "C++ purchased",
    //   dismissible: false,
    // });
    // this.alertService.success("Hello", "I am doing well");
    // setTimeout(() => {
    //   this.alertService.error("Error title", "Error message", {
    //     dismissible: false,
    //   });
    //   this.alertService.clear(courseAlertRef.id);
    // }, 5000);
    // setTimeout(() => {
    //   this.alertService.info("Info t", "Info message here", {
    //     classes: "d-flex text-danger",
    //   });
    // }, 5500);
  }
}
