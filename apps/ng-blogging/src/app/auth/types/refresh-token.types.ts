import { IApiResponse } from "../../common/types";

export interface IAccessToken {
  accessToken: string;
}

export type IRefreshTokenResponse = IApiResponse<IAccessToken>;
