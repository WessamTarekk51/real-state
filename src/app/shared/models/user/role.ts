import { IResult } from "../result";

export interface RootDashboardRole extends IResult {
  value: DashboardRole
}

export interface DashboardRole {
  totalRoles: number,
  totalUsers: number,
  activeUsers: number,
  inactiveUsers: number,
  roleDistribution: RoleDistribution[]
}

export interface RoleDistribution {
  roleId: string,
  roleName: string,
  userCount: number
}
