import { connect } from "@/libs/db";
import type { IFaculty } from "@/interfaces";
import type { RowDataPacket } from "mysql2";

export async function getFaculties(): Promise<Array<IFaculty> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM Faculties"
  );
  await conn.end();
  return rows as Array<IFaculty>;
}
