import { connect } from "@/libs/db";
import type { ICategory } from "@/interfaces";
import type { RowDataPacket } from "mysql2";

export async function getCategories(): Promise<Array<ICategory> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM Categories"
  );
  await conn.end();
  return rows as Array<ICategory>;
}
