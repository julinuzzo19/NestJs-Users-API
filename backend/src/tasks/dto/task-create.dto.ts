import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { Task } from '../task.entity';

export class TaskCreateDto {
  @IsNotEmpty()
  @IsString()
  name: Task['name'];

  @IsNotEmpty()
  @IsNumber()
  duration: Task['duration'];

  @IsNotEmpty()
  @IsString()
  description: Task['description'];

  @IsUUID()
  @IsOptional()
  user: string;
}
