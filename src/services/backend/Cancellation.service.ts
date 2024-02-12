import type { ICanceledAppointment } from "@/interfaces";
import { connect } from "@/libs/db";
import type { ResultSetHeader } from "mysql2";

export async function createCancellation(
  cancellation: ICanceledAppointment
): Promise<ICanceledAppointment | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO CanceledAppointments SET ?",
    [cancellation]
  );
  await conn.end();
  return result.affectedRows > 0 ? cancellation : null;
}
