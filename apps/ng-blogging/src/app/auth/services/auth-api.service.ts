import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ICreateUserRequest, ILoginRequest, ILoginResponse } from "../types";
import { environment } from "../../../environments/environment";
import { handleApiError } from "../../common/http/utils";

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private readonly authApiUrl = `${environment.apiBaseUrl}/auth`;

  private readonly http = inject(HttpClient);

  public register(
    _createUserRequest: ICreateUserRequest,
  ): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.authApiUrl}/register`, {
        lastName: "Rana",
        email: "a.com",
        phone: "1234567",
        password: "123456789",
      })
      .pipe(catchError(handleApiError));
  }

  public login(loginCreds: ILoginRequest) {
    return this.http
      .post<ILoginResponse>(`${this.authApiUrl}/login`, loginCreds)
      .pipe(catchError(handleApiError));
  }
}
