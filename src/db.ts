import { createPool } from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PSW, DB_NAME } = process.env;

export function connect() {
  return createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PSW,
    database: DB_NAME,
  });
}
