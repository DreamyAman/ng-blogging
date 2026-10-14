import { Component, computed, inject } from "@angular/core";
import { AlertType, IAlert } from "../types";
import { TitleCasePipe, NgClass } from "@angular/common";
import { AlertService } from "../services";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrl: "./alert.component.scss",
  imports: [TitleCasePipe, NgClass],
})
export class AlertComponent {
  protected readonly alertService = inject(AlertService);

  protected readonly alerts = computed(() => {
    const list = this.alertService.alertList();

    return list.map((alert) => {
      const defaultAlertClass = this.getAlertDefaultClass(alert);

      const incomingAlertClasses = alert.classes;

      alert.classes = incomingAlertClasses
        ? `${incomingAlertClasses} ${defaultAlertClass}`
        : defaultAlertClass;

      return alert;
    });
  });

  protected AlertType = AlertType;

  protected getAlertDefaultClass(alert: IAlert): string {
    switch (alert.type) {
      case AlertType.SUCCESS:
        return "alert-success";

      case AlertType.FAILURE:
        return "alert-danger";

      default:
        return "alert-info";
    }
  }
}
