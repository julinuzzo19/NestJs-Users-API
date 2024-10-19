import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: any; // Puedes especificar el tipo exacto de tu objeto usuario
  }
}
