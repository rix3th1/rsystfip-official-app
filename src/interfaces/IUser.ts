export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  document_id: number;
  document_number: string;
  phone_number: string;
  email: string;
  password?: string;
  role_id: number;
  role_name: string;
  permissions: Array<string>;
}
