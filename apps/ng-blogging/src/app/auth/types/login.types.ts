import { IApiResponse, IUser } from "../../common/types";

export interface IUserAndAccessToken {
  user: IUser;
  accessToken: string;
}

export type ILoginResponse = IApiResponse<IUserAndAccessToken>;

export interface ILoginRequest {
  email: string;
  password: string;
}
