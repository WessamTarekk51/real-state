import { IResult } from "../result";

export interface RootLoginUser extends IResult {
  value: LoginUser
}

export interface LoginUser {
  succeeded: boolean,
  message: string,
  userId: string,
  userName: string,
  email: string,
  token: {
    accessToken: string,
    refreshToken: string
  }

}
