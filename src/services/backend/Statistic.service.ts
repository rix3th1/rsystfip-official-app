import type { IAppointment, ICount, IStatistic } from "@/interfaces";
import { connect } from "@/libs/db";
import type { RowDataPacket } from "mysql2";

export async function getStatistics(
  status: IAppointment["status"],
  start_time: IAppointment["start_time"],
  end_time: IAppointment["end_time"]
): Promise<Array<IStatistic> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT SUM(CASE WHEN A.status = ? THEN 1 ELSE 0 END) AS scheduling_count, C.category_name FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id WHERE A.start_time >= ? AND A.start_time <= ? GROUP BY P.category_id",
    [status, start_time, end_time]
  );
  await conn.end();
  return rows as Array<IStatistic>;
}

export async function getMostAgendatedOnRange(
  status: IAppointment["status"],
  start_time: IAppointment["start_time"],
  end_time: IAppointment["end_time"]
): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT C.category_name, COUNT(A.person_id) AS counts FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id WHERE A.status = ? AND A.start_time >= ? AND A.start_time <= ? GROUP BY P.category_id, C.category_name ORDER BY counts DESC LIMIT 10",
    [status, start_time, end_time]
  );
  await conn.end();
  return rows as Array<ICount>;
}

export async function getMostAgendatedAllTime(
  status: IAppointment["status"]
): Promise<Array<ICount> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT C.category_name, COUNT(A.person_id) AS counts FROM Appointments A INNER JOIN People P ON P.id = A.person_id INNER JOIN Categories C ON C.id = P.category_id WHERE A.status = ? GROUP BY P.category_id, C.category_name ORDER BY counts DESC LIMIT 10",
    [status]
  );
  await conn.end();
  return rows as Array<ICount>;
}
