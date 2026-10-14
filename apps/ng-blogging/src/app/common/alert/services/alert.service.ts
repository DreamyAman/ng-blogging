import { computed, Injectable, signal } from "@angular/core";
import { IAlert, AlertType, IAlertConfig, ICreateAlertOptions } from "../types";
import { generateId } from "../../utils";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  private readonly alertMap = signal<Map<string, IAlert>>(new Map());

  alertList = computed<IAlert[]>(() => {
    return Array.from(this.alertMap().values()).reverse();
  });

  private updateAlertMap() {
    const alertList = Array.from(this.alertMap().values());

    const newMap = alertList.reduce((newAlertMap, alert) => {
      newAlertMap.set(alert.id, alert);

      return newAlertMap;
    }, new Map());

    this.alertMap.set(newMap);
  }

  public open(alertOptions: ICreateAlertOptions) {
    const id = generateId();

    const alert = {
      id,
      dismissible: alertOptions.dismissible ?? true,
      ...alertOptions,
    };

    this.alertMap().set(id, alert);

    this.updateAlertMap();

    return alert;
  }

  public success(title: string, message: string, config: IAlertConfig = {}) {
    return this.open({
      ...config,
      title,
      message,
      type: AlertType.SUCCESS,
    });
  }

  public error(title: string, message: string, config: IAlertConfig = {}) {
    return this.open({
      ...config,
      title,
      message,
      type: AlertType.FAILURE,
    });
  }

  public info(title: string, message: string, config: IAlertConfig = {}) {
    return this.open({
      ...config,
      title,
      message,
      type: AlertType.INFO,
    });
  }

  public clear(id: string) {
    this.alertMap().delete(id);

    this.updateAlertMap();
  }
}
