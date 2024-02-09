import { createPool } from "mysql2/promise";
import { DATABASE, HOST, PASSWORD, USER } from "./config";

export function connect() {
  return createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  });
}
