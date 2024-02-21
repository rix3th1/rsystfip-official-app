import type { IAppointment, ICalendar, IPeople } from "@/interfaces";
import { connect } from "@/libs/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function createSchedule(
  scheduleData: IAppointment
): Promise<IAppointment | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO Appointments SET ?",
    [scheduleData]
  );
  await conn.end();
  return result.affectedRows > 0 ? scheduleData : null;
}

export async function getSchedule(
  id: IAppointment["id"]
): Promise<(IAppointment & IPeople) | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT A.id, A.person_id, P.first_name, P.last_name, P.phone_number, P.email, A.start_time, A.end_time, A.status FROM Appointments A INNER JOIN People P ON P.id = A.person_id WHERE A.id = ?",
    [id]
  );
  await conn.end();
  return rows[0] as IAppointment & IPeople;
}

export async function getSchedules(): Promise<Array<ICalendar> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT A.id, CONCAT(first_name, ' ', last_name) AS title, A.start_time AS start, A.end_time AS end, A.color FROM Appointments A INNER JOIN People P ON P.id = A.person_id WHERE A.status = 'scheduled'"
  );
  await conn.end();
  return rows as Array<ICalendar>;
}

export async function updateSchedule(
  cancellation: Partial<IAppointment>,
  person_id: IAppointment["person_id"],
  start_time: IAppointment["start_time"]
): Promise<Partial<IAppointment> | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE Appointments SET ? WHERE person_id = ? AND start_time = ?",
    [cancellation, person_id, start_time]
  );
  await conn.end();
  return result.affectedRows > 0 ? cancellation : null;
}
