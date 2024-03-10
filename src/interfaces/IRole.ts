export type TPermission =
  | "admin"
  | "add"
  | "schedule"
  | "reports"
  | "statistics";

export type TRole = "admin" | "secretaria" | "rector";

export interface IRole {
  id: string;
  role_name: TRole;
  permissions: TPermission[];
}
