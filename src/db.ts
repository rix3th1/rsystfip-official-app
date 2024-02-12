import { createPool } from "mysql2/promise";
import { DATABASE, DB_PORT, HOST, PASSWORD, USER } from "./config";

export function connect() {
  return createPool({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  });
}
