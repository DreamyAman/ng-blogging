import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ICreateUserRequest, ILoginRequest, ILoginResponse } from "../types";
import { AuthApiService } from "./auth-api.service";
import { IUser } from "../../common/types";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly authApi = inject(AuthApiService);

  public readonly isAuthenticated = computed(() => !!this.authToken());

  public readonly user = computed<IUser | null>(() => {
    if (!this.isAuthenticated()) {
      return null;
    }

    return this.userData();
  });

  private readonly accessTokenKey = `${environment.platformPrefix}_access_token`;
  private readonly userKey = `${environment.platformPrefix}_user`;

  private readonly authToken = signal<string | null>(
    (() => {
      const accessToken = window.localStorage.getItem(this.accessTokenKey);

      try {
        return accessToken;
      } catch {
        return null;
      }
    })(),
  );

  private readonly userData = signal(
    (() => {
      const user = window.localStorage.getItem(this.userKey);

      try {
        return JSON.parse(user as string) as IUser;
      } catch {
        return null;
      }
    })(),
  );

  constructor() {
    effect(() => {
      const accessToken = this.authToken();
      const user = this.user();

      if (accessToken) {
        window.localStorage.setItem(this.accessTokenKey, accessToken);
      }

      if (user) {
        window.localStorage.setItem(this.userKey, JSON.stringify(user));
      }
    });
  }

  public register(
    createUserRequest: ICreateUserRequest,
  ): Observable<ILoginResponse> {
    return this.authApi
      .register(createUserRequest)
      .pipe(tap((resp) => this.setSession(resp)));
  }

  public login(loginCreds: ILoginRequest) {
    return this.authApi
      .login(loginCreds)
      .pipe(tap((resp) => this.setSession(resp)));
  }

  private setSession(resp: ILoginResponse) {
    const { data } = resp;

    this.authToken.set(data.accessToken);
    this.userData.set(data.user);
  }
}
