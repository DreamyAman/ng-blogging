export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export type IDeleteResponse<T = unknown | ""> = IApiResponse<T>;
