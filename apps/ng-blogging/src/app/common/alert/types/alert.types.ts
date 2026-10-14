export enum AlertType {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  INFO = "INFO",
}

export interface IAlert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  dismissible?: boolean;
  classes?: string;
}

export type ICreateAlertOptions = Omit<IAlert, "id">;

export type IAlertConfig = Omit<
  ICreateAlertOptions,
  "title" | "message" | "type"
>;
