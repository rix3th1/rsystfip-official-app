declare namespace NodeJS {
  export interface ProcessEnv {
    DB_PORT?: number;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PSW?: string;
    DB_NAME?: string;
    NEXTAUTH_SECRET?: string;
    GMAIL_USER?: string;
    GMAIL_PASS?: string;
    GMAIL_SENDER?: string;
  }
}
