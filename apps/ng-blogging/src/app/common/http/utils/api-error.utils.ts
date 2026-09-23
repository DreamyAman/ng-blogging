import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {
  IApiErrorResponse,
  IBadRequestError,
  IErrorType,
  ISerializedErrorResponse,
} from "../../types/error-response.types";
import { ErrorStatus } from "../../types/error.constants";
import { throwError } from "rxjs";

export function handleApiError(errResp: HttpErrorResponse | Error) {
  const error = {} as ISerializedErrorResponse;

  // handle http error
  if (errResp instanceof HttpErrorResponse) {
    const apiErrorResp = errResp.error as IApiErrorResponse;

    error.message = apiErrorResp.error?.message;
    error.status = apiErrorResp.error?.status;

    // handle if not a network request
    if (errResp.status === 0) {
      error.message =
        errResp.message ||
        "Something went wrong. Please check your internet connection or try again after sometime.";
      error.status = ErrorStatus.UNKNOWN;
    }

    // need to handle backend error those are unknown one's
    else if (!apiErrorResp) {
      error.message =
        errResp.message || "Something went wrong. Contact support.";
      error.status = ErrorStatus.UNKNOWN;
    }

    // handle bad request
    if (errResp.status === HttpStatusCode.BadRequest) {
      const badRequestError = apiErrorResp.error.details.find((errorDetail) => {
        return (errorDetail as IErrorType)["@type"].includes("BadRequest");
      });

      error.details = (badRequestError as IBadRequestError).fieldViolations;
    }

    // handle already exists
    else if (errResp.status === HttpStatusCode.Conflict) {
      error.details = apiErrorResp.error.details.find((errorDetail) => {
        return (errorDetail as IErrorType)["@type"].includes("ErrorInfo");
      });
    }

    // handle unknown errors
    else if (errResp.status < 500) {
      error.details = apiErrorResp.error.details.find((errorDetail) => {
        const errorType = (errorDetail as IErrorType)["@type"];

        return (
          errorType.includes("ErrorInfo") ||
          errorType.includes("ResourceInfo") ||
          errorType.includes("LocalizedMessage")
        );
      });
    }

    // handle internal server errors
    else if (errResp.status >= 500) {
      error.status = ErrorStatus.INTERNAL;
      error.message = "Something went wrong. Please try again after sometime.";
    }
  }
  // handle non-http errors
  else {
    error.message = "Something went wrong. Please try again.";
    error.status = ErrorStatus.UNKNOWN;
  }

  return throwError(() => error);
}
