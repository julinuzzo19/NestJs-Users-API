import { CookieOptions } from 'express';
import { NODE_ENV } from './configs';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30,
};
