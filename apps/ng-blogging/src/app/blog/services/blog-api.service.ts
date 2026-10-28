import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import {
  IBlogQueryParams,
  ICreateBlogRequest,
  ICreateBlogResponse,
  IDeleteBlogResponse,
  IGetBlogResponse,
  ISearchBlogResponse,
  IUpdateBlogRequest,
  IUpdateBlogResponse,
  IUpdateBlogStatusResponse,
} from "../types";
import { environment } from "../../../environments/environment";
import { handleApiError } from "../../common/http/utils";
import { SKIP_AUTH_TOKEN } from "../../common/http/skip-auth.context";

@Injectable({
  providedIn: "root",
})
export class BlogApiService {
  private readonly blogApiUrl = `${environment.apiBaseUrl}/blogs`;

  private readonly http = inject(HttpClient);

  public create(
    createBlogRequest: ICreateBlogRequest,
  ): Observable<ICreateBlogResponse> {
    return this.http
      .post<ICreateBlogResponse>(this.blogApiUrl, createBlogRequest)
      .pipe(catchError(handleApiError));
  }

  public update(
    id: string,
    updateBlogRequest: IUpdateBlogRequest,
  ): Observable<IUpdateBlogResponse> {
    const url = `${this.blogApiUrl}/${id}`;
    return this.http
      .post<IUpdateBlogResponse>(url, updateBlogRequest)
      .pipe(catchError(handleApiError));
  }

  public updateStatus(
    id: string,
    updateStatusRequest: IUpdateBlogRequest,
  ): Observable<IUpdateBlogStatusResponse> {
    const url = `${this.blogApiUrl}/${id}`;

    return this.http
      .patch<IUpdateBlogStatusResponse>(url, updateStatusRequest)
      .pipe(catchError(handleApiError));
  }

  public getById(id: string): Observable<IGetBlogResponse> {
    const url = `${this.blogApiUrl}/${id}`;

    return this.http
      .get<IGetBlogResponse>(url)
      .pipe(catchError(handleApiError));
  }

  private createSearchRequest(
    params?: IBlogQueryParams,
    skipAuth = false,
  ): Observable<ISearchBlogResponse> {
    const defaultParams = {
      page: 1,
      limit: 10,
    };

    // 1. custom way
    // 2. new UrlSearchParams(queryParams).toString();
    // 3. directly pass to angular params
    // 4. dynamic and advanced handling using new HttpParams()
    const queryParams = {
      ...defaultParams,
      ...(params ?? {}),
    }; // { page: 1, limit: 10 } { page: 2 } => { page: 2, limit: 10 }

    const req = {
      params: queryParams, // or we can use queryParams object directly (point 3)
    };

    // can add auth token
    if (!skipAuth) {
      const httpCtx = new HttpContext().set(SKIP_AUTH_TOKEN, true);

      Object.assign(req, { context: httpCtx });
    }

    return this.http
      .get<ISearchBlogResponse>(this.blogApiUrl, req)
      .pipe(catchError(handleApiError));
  }

  // public endpoint without auth token
  public search(params?: IBlogQueryParams): Observable<ISearchBlogResponse> {
    return this.createSearchRequest(params, true);
  }

  public myBlogs(params?: IBlogQueryParams): Observable<ISearchBlogResponse> {
    return this.createSearchRequest(params);
  }

  public delete(id: string): Observable<IDeleteBlogResponse> {
    const url = `${this.blogApiUrl}/${id}`;

    return this.http
      .delete<IDeleteBlogResponse>(url)
      .pipe(catchError(handleApiError));
  }
}
