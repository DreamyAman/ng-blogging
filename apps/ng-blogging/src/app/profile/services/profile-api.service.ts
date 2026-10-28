import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { handleApiError } from "../../common/http/utils";
import { IProfileResponse } from "../types";

@Injectable()
export class ProfileApiService {
  private readonly profileApiUrl = `${environment.apiBaseUrl}/profile`;

  private readonly http = inject(HttpClient);

  public getProfile(): Observable<IProfileResponse> {
    return this.http
      .get<IProfileResponse>(this.profileApiUrl)
      .pipe(catchError(handleApiError));
  }
}
