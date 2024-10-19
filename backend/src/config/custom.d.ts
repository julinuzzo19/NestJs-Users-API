import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: { sub: string; email: string }; // Puedes especificar el tipo exacto de tu objeto usuario
  }
}
