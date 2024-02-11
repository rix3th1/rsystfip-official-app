export interface IPayload {
  userId: string;
  email: string;
  role_name: string;
  permissions: Array<string>;
  iat: number;
  exp: number;
}
