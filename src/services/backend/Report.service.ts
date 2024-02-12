import { connect } from "@/libs/db";
import type { IAppointment, ICount, IReport } from "@/interfaces";
import type { RowDataPacket } from "mysql2";

export async function getReports(
  start_time: IAppointment["start_time"],
  end_time: IAppointment["end_time"]
): Promise<Array<IReport> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT P.id, P.first_name, P.last_name, A.created_at, A.updated_at, A.start_time, A.end_time, SUM(CASE WHEN A.status = 'scheduled' THEN 1 ELSE 0 END) AS scheduling_count, SUM(CASE WHEN A.status = 'daily' THEN 1 ELSE 0 END) AS daily_count, C.category_name, P.category_id FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id WHERE A.start_time >= ? AND A.start_time <= ? GROUP BY A.person_id, A.created_at, A.updated_at, A.start_time, A.end_time",
    [start_time, end_time]
  );
  await conn.end();
  return rows as Array<IReport>;
}

export async function getReportCount(
  start_time: IAppointment["start_time"],
  end_time: IAppointment["end_time"]
): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT C.category_name, COUNT(A.person_id) AS counts FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id WHERE A.start_time >= ? AND A.start_time <= ? GROUP BY P.category_id, C.category_name ORDER BY counts DESC LIMIT 10",
    [start_time, end_time]
  );
  await conn.end();
  return rows as Array<ICount>;
}

export async function getReportCounts(): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT C.category_name, COUNT(A.person_id) AS counts FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id GROUP BY P.category_id, C.category_name ORDER BY counts DESC LIMIT 10"
  );
  await conn.end();
  return rows as Array<ICount>;
}
