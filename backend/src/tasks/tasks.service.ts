import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

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
      relations: ['user'],
    });
  }

  async createTask(task: TaskCreateDto) {
    return this.taskRepository.save({ ...task, user: { id: task.user } });
  }

  async updateTask(task: TaskUpdateDto, id: string, userId: string) {
    const result = await this.taskRepository.update(
      { id, user: { id: userId } },
      task,
    );

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return {
      message: 'Task updated successfully',
    };
  }
}
