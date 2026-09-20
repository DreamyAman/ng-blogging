import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateUserRequest, ILoginResponse } from "../types";

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private readonly authApiUrl = "http://localhost:3000/auth";

  private readonly http = inject(HttpClient);

  public register(
    createUserRequest: ICreateUserRequest,
  ): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.authApiUrl}/register`,
      createUserRequest,
    );
  }
}
