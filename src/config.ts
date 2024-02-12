const PORT = process.env.APP_PORT;
const DB_PORT = process.env.DB_PORT;
const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PSW;
const DATABASE = process.env.DB_NAME;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const NAME_SENDER = process.env.NAME_SENDER;

if (
  !(
    PORT ||
    HOST ||
    USER ||
    PASSWORD ||
    DATABASE ||
    DB_PORT ||
    NEXTAUTH_SECRET ||
    NEXTAUTH_URL ||
    SENDGRID_API_KEY ||
    SECRET_KEY ||
    EMAIL_SENDER ||
    NAME_SENDER
  )
) {
  console.error(
    "Please add .env file with environment variables. See .env.local.example"
  );
}

export {
  DATABASE,
  DB_PORT,
  EMAIL_SENDER,
  HOST,
  NAME_SENDER,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  PASSWORD,
  PORT,
  SECRET_KEY,
  SENDGRID_API_KEY,
  USER,
};
