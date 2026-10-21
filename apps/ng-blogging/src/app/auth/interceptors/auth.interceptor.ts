import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  const canSkipUrl =
    req.url.match("/auth/login") ||
    req.url.match("/auth/register") ||
    req.url.match("/auth/refresh-token");

  if (canSkipUrl) {
    return next(req);
  }

  return authService.getValidToken().pipe(
    switchMap((token) => {
      return executeRequest(req, next, token);
    }),
    // 2. Reactive Phase: Catch unexpected 401 errors if the server rejects the token early
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === HttpStatusCode.Unauthorized
      ) {
        console.warn(
          "Token rejected by server early. Initiating reactive refresh...",
        );

        // Trigger the exact same secure refresh method
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            // Retry the original request with the fresh token
            return executeRequest(req, next, newToken);
          }),
          catchError((refreshError) => {
            // If the refresh token itself is dead, let the auth service log the user out
            authService.logout();
            return throwError(() => refreshError);
          }),
        );
      }

      // Pass along any other HTTP errors (400, 403, 500, etc.) normally
      return throwError(() => error);
    }),
  );
};

/**
 * Clean helper function to clone requests and append the header
 */
function executeRequest(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  token: string | null,
): Observable<HttpEvent<unknown>> {
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(clonedReq);
}
