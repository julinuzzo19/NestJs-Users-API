import { IsEmail, IsNotEmpty, IsUUID, IsIn } from 'class-validator';
import { User } from '../user.entity';

export class UserCreateDto {
  @IsNotEmpty()
  name: User['name'];
  @IsEmail()
  email: User['email'];
  @IsNotEmpty()
  password: User['password'];
  @IsIn(['ADMIN', 'USER'])
  role: User['role'];
}
