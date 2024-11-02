import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TaskCreateDto } from './dto/task-create.dto';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Roles(Role.USER)
  @Post()
  createTask(@Body() createDto: TaskCreateDto, @Req() req: Request) {
    return this.tasksService.createTask({ ...createDto, user: req.user.sub });
  }
  @Roles(Role.USER)
  @Get()
  getUserTasks(@Req() req: Request) {
    return this.tasksService.getTasksByUserId(req.user.sub);
  }
}
