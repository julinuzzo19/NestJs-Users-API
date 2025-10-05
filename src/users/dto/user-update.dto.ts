import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';
import { User } from '../user.entity';

export class UserUpdateDto {
  @IsNotEmpty()
  name: User['name'];
  @IsEmail()
  email: User['email'];
  @IsNotEmpty()
  password: User['password'];
  @IsIn(['ADMIN', 'USER'])
  role: User['role'];
}
