import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsString,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Task } from '../task.entity';

export class TaskUpdateDto {
  @IsString()
  @IsOptional()
  name: Task['name'];

  @IsNumber()
  @IsOptional()
  duration: Task['duration'];

  @IsString()
  @IsOptional()
  description: Task['description'];

  @IsIn(['PENDING', 'DONE', 'IN_PROGRESS'])
  @IsOptional()
  status: Task['status'];
}
