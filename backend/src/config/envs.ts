export const API_PORT = process.env.API_PORT || 3010;

// DATABASE
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;

export const NODE_ENV = (process.env.NODE_ENV || 'development') as
  | 'production'
  | 'development';
