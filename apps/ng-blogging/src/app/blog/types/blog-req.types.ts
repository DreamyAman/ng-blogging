import {
  IApiResponse,
  IDeleteResponse,
  IPageQueryParams,
  IPaginationResult,
} from "../../common/types";
import { IBlog } from "./blog.types";

// <Verb|Action><Resource><Prefix>

export type ICreateBlogRequest = Pick<IBlog, "title" | "content">;

export type IUpdateBlogRequest = Partial<ICreateBlogRequest>;

export type IUpdateBlogStatusRequest = Pick<IBlog, "status">;

export type ICreateBlogResponse = IApiResponse<IBlog>;

export type IUpdateBlogResponse = ICreateBlogResponse;

export type IUpdateBlogStatusResponse = IUpdateBlogResponse;

export type IDeleteBlogResponse = IDeleteResponse;

export type IGetBlogResponse = IApiResponse<IBlog>;

export type ISearchBlogResponse = IPaginationResult<IBlog>;

export type IBlogQueryParams = IPageQueryParams;
