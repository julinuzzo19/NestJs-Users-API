import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './dto/task-create.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasksByUserId(userId: string) {
    return this.taskRepository.find({
      select: {
        id: true,
        name: true,
        description: true,
        duration: true,
        status: true,
        createdAt: true,
      },
      where: { user: { id: userId } },
    });
  }

  async createTask(task: TaskCreateDto) {
    return this.taskRepository.save({ ...task, user: { id: task.user } });
  }
}
