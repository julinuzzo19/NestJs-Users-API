import * as dotenv from 'dotenv';
dotenv.config();

export const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  NODE_ENV = 'production',
  CLIENT_URL,
  PORT,
  JWT_SECRET,
} = process.env;
