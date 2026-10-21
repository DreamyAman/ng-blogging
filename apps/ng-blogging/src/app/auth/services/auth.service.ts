import { computed, effect, inject, Injectable, signal } from "@angular/core";
import {
  catchError,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  Subscription,
  switchMap,
  tap,
  throwError,
  timer,
} from "rxjs";
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

  private backgrounRefreshTimeSubscription: Subscription | null = null;

  private refreshTokenObservable$: Observable<string> | null = null;

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

  public getValidToken() {
    if (this.isTokenNearExpiry().needRefresh) {
      // is token near expiry, refresh access token
      return this.refreshToken();
    }

    // return valid token
    return of(this.authToken());
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

    this.scheduleBackgroundRefresh();
  }

  private updateToken(accessToken: string) {
    this.authToken.set(accessToken);

    this.scheduleBackgroundRefresh();
  }

  private scheduleBackgroundRefresh() {
    this.clearBackgroundRefreshTimer();

    const { timeUntilRefresh, refreshDelay } = this.isTokenNearExpiry();

    // if time is left and 80% is not yet completed
    if (timeUntilRefresh > 0) {
      this.backgrounRefreshTimeSubscription = timer(refreshDelay)
        .pipe(switchMap(() => this.refreshToken()))
        .subscribe({
          error: (err) => console.error("Background refresh failed", err),
        });
    } else {
      // if time is expire or 80% threshold reached
      this.refreshToken().subscribe({
        error: (err) =>
          console.error("Immediate background refresh failed", err),
      });
    }
  }

  private clearBackgroundRefreshTimer() {
    if (this.backgrounRefreshTimeSubscription) {
      this.backgrounRefreshTimeSubscription.unsubscribe();
    }
  }

  public isTokenNearExpiry() {
    const iat = Date.now();
    const exp = iat + 15 * 1000;

    const totalLifetime = exp - iat;
    const refreshDelay = totalLifetime * 0.8; // 80% of total time
    const refreshTime = iat + refreshDelay;
    const timeUntilRefresh = refreshTime - Date.now();

    return {
      needRefresh: Date.now() >= refreshTime,
      timeUntilRefresh,
      refreshDelay,
    };
  }

  public refreshToken() {
    if (this.refreshTokenObservable$) {
      return this.refreshTokenObservable$;
    }

    this.refreshTokenObservable$ = this.authApi.refreshToken().pipe(
      map((resp) => resp.data.accessToken),
      tap((accessToken) => this.updateToken(accessToken)),
      switchMap((accessToken) => of(accessToken)),
      shareReplay(1), // share one subscription/Observable across requests
      finalize(() => {
        this.refreshTokenObservable$ = null;
      }),
      catchError((err) => {
        // logout session
        this.logout();
        return throwError(() => err);
      }),
    );

    return this.refreshTokenObservable$;
  }

  public logout() {
    this.clearBackgroundRefreshTimer();
    this.authToken.set(null);
    this.userData.set(null);
    //clear local storage for app data
    window.localStorage.clear();
  }
}
