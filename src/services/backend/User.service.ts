import { connect } from "@/libs/db";
import type { IUser } from "@/interfaces";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function getUser(
  id?: IUser["id"],
  email?: string
): Promise<IUser | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT U.id, U.first_name, U.last_name, U.email, U.password, R.role_name, R.permissions FROM Users U INNER JOIN Roles R ON U.role_id = R.id WHERE U.email = ? OR U.id = ?",
    [email, id]
  );
  await conn.end();
  return rows[0] as IUser;
}

export async function getUsers(): Promise<Array<IUser> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT U.id, U.first_name, U.last_name, U.document_number, D.document_name, U.phone_number, U.email, U.role_id, U.authorized, R.role_name FROM Users U INNER JOIN Roles R ON U.role_id = R.id INNER JOIN Documents D ON U.document_id = D.id"
  );
  await conn.end();
  return rows as Array<IUser>;
}

export async function createUser(
  user: Partial<IUser>
): Promise<Partial<IUser> | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO Users SET ?",
    [user]
  );
  await conn.end();
  delete user.password;
  return result.affectedRows > 0 ? { ...user, id: `${result.insertId}` } : null;
}

export async function deleteUser(id: IUser["id"]): Promise<boolean> {
  const conn = connect();
  if (!conn) return false;
  const [result] = await conn.query<ResultSetHeader>(
    "DELETE FROM Users WHERE id = ?",
    [id]
  );
  await conn.end();
  return result.affectedRows > 0;
}

export async function updateUser(
  id: IUser["id"],
  user: IUser
): Promise<IUser | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE Users SET ? WHERE id = ?",
    [user, id]
  );
  await conn.end();
  return result.affectedRows > 0 ? user : null;
}
