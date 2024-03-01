declare namespace NodeJS {
  export interface ProcessEnv {
    DB_PORT?: number;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PSW?: string;
    DB_NAME?: string;
    NEXTAUTH_SECRET?: string;
    SENDGRID_API_KEY?: string;
    EMAIL_SENDER?: string;
    NAME_SENDER?: string;
  }
}
