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
  roleName: string,
  roleId: string,
  token: {
    accessToken: string,
    refreshToken: string
  }
  permissionIds?: string[]
}
export interface RootUserPermission extends IResult {
  value: UserPermission
}
export interface UserPermission {
  description: string
  id: string
  name: string
  permissionIds: string[]
}
