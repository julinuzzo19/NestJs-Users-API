import * as dotenv from 'dotenv';
dotenv.config();

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  NODE_ENV = 'production',
  CLIENT_URL,
  PORT,
  JWT_SECRET,
  SSL_KEY,
  SSL_CERT,
} = process.env;

if (
  !DB_HOST ||
  !DB_USER ||
  !DB_PASSWORD ||
  !DB_NAME ||
  !DB_PORT ||
  !NODE_ENV ||
  !CLIENT_URL ||
  !PORT ||
  !JWT_SECRET ||
  (NODE_ENV === 'production' && (!SSL_KEY || !SSL_CERT))
) {
  throw new Error('Missing environment variables');
}

export {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  NODE_ENV,
  CLIENT_URL,
  PORT,
  JWT_SECRET,
  SSL_KEY,
  SSL_CERT,
};
