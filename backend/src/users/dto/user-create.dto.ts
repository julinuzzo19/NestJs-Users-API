import { IsEmail, IsNotEmpty, IsUUID, IsIn } from 'class-validator';

export class UserCreateDto {
  @IsUUID()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsIn(['ADMIN', 'USER'])
  role: string;
}
