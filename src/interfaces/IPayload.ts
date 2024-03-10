import type { IRole } from ".";

export interface IPayload {
  userId: string;
  email: string;
  role_name: IRole["role_name"];
  permissions: IRole["permissions"];
  iat: number;
  exp: number;
}
