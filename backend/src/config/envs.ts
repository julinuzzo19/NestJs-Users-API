
// no se usa
export const NODE_ENV = (process.env.NODE_ENV || 'development') as
  | 'production'
  | 'development';

export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  database: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
  },
});
