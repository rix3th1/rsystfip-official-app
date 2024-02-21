import type { IDean } from "@/interfaces";
import { connect } from "@/libs/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function getDean(id: IDean["id"]): Promise<IDean | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM Deans WHERE id = ?",
    [id]
  );
  await conn.end();
  return rows[0] as IDean;
}

export async function getDeans(): Promise<Array<IDean> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>("SELECT * FROM Deans");
  await conn.end();
  return rows as Array<IDean>;
}

export async function createDean(dean: IDean): Promise<IDean | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO Deans SET ?",
    [dean]
  );
  await conn.end();
  return result.affectedRows > 0 ? dean : null;
}
