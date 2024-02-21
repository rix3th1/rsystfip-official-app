import type { IPeople } from "@/interfaces";
import { connect } from "@/libs/db";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export async function createPerson(person: IPeople): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO People SET ?",
    [person]
  );
  await conn.end();
  return result.affectedRows > 0 ? { ...person, id: result.insertId } : null;
}

export async function getPerson(id: IPeople["id"]): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM People WHERE id = ?",
    [id]
  );
  await conn.end();
  return rows[0] as IPeople;
}

export async function updatePerson(
  id: IPeople["id"],
  person: IPeople
): Promise<IPeople | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "UPDATE People SET ? WHERE id = ?",
    [person, id]
  );
  await conn.end();
  return result.affectedRows > 0 ? person : null;
}

export async function getPeople(): Promise<Array<IPeople> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT A.id, P.first_name, P.last_name, D.document_name, C.category_name, P.faculty_id, D.document_description, P.document_number, F.faculty_name, P.phone_number, P.email, A.visit_subject FROM People P INNER JOIN Appointments A ON P.id = A.person_id INNER JOIN Documents D ON P.document_id = D.id INNER JOIN Faculties F ON P.faculty_id = F.id INNER JOIN Categories C ON P.category_id = C.id ORDER BY P.id ASC"
  );
  await conn.end();
  return rows as Array<IPeople>;
}

export async function getCancelledPeople(): Promise<Array<IPeople> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT P.id, P.first_name, P.last_name, D.document_name, C.category_name, P.faculty_id, D.document_description, P.document_number, F.faculty_name, CA.cancellation_subject FROM People P INNER JOIN Documents D ON P.document_id = D.id INNER JOIN Faculties F ON P.faculty_id = F.id INNER JOIN Categories C ON P.category_id = C.id INNER JOIN CanceledAppointments CA ON P.id = CA.person_id INNER JOIN Appointments A ON A.person_id = CA.person_id WHERE A.status = 'cancelled' ORDER BY P.id ASC"
  );
  await conn.end();
  return rows as Array<IPeople>;
}
