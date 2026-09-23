import { ErrorStatus } from "./error.constants";

export interface IErrorType {
  "@type": string;
}

export interface IFieldViolation {
  field: string;
  description: string;
}

export interface IBadRequestError extends IErrorType {
  fieldViolations: IFieldViolation[];
}

export interface IErrorInfoError extends IErrorType {
  reason: string;
  domain: string;
  metadata: Record<string, unknown>;
}

export interface ILocalizedMessageError extends IErrorType {
  locale: string;
  message: string;
}

export type IErrorDetail =
  | IBadRequestError
  | IErrorInfoError
  | ILocalizedMessageError
  | unknown;

export interface IApiError {
  code: number;
  message: string;
  status: ErrorStatus;
  details: Array<unknown>;
}

export interface IApiErrorResponse<E = IApiError> {
  error: E;
}

export interface ISerializedErrorResponse {
  message: string;
  status: ErrorStatus;
  details?: unknown;
}
