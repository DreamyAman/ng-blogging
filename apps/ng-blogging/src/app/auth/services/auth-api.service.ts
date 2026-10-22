import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import {
  ICreateUserRequest,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
} from "../types";
import { environment } from "../../../environments/environment";
import { handleApiError } from "../../common/http/utils";

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private readonly authApiUrl = `${environment.apiBaseUrl}/auth`;

  private readonly http = inject(HttpClient);

  public register(
    createUserRequest: ICreateUserRequest,
  ): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.authApiUrl}/register`, createUserRequest, {
        withCredentials: true,
      })
      .pipe(catchError(handleApiError));
  }

  public login(loginCreds: ILoginRequest) {
    return this.http
      .post<ILoginResponse>(`${this.authApiUrl}/login`, loginCreds, {
        withCredentials: true,
      })
      .pipe(catchError(handleApiError));
  }

  public refreshToken() {
    return this.http.post<IRefreshTokenResponse>(
      `${this.authApiUrl}/refresh-token`,
      {},
      {
        withCredentials: true,
      },
    );
  }
}
