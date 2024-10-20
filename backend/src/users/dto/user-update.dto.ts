import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsIn(['ADMIN', 'USER'])
  role: string;
}
