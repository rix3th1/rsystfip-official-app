export interface IPayload {
  userId: number;
  email: string;
  role_name: string;
  permissions: Array<string>;
  iat: number;
  exp: number;
}
