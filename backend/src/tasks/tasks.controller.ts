import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskCreateDto } from './dto/task-create.dto';
import { TasksService } from './tasks.service';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/role.decorator';
import { Role } from '../roles/role';
import { TaskUpdateDto } from './dto/task-update.dto';

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
  @Put(':id')
  updateTask(
    @Body() updateDto: TaskUpdateDto,
    @Param('id') taskId,
    @Req() req: Request,
  ) {
    return this.tasksService.updateTask(updateDto, taskId, req.user.sub);
  }
  @Roles(Role.USER)
  @Get()
  getUserTasks(@Req() req: Request) {
    return this.tasksService.getTasksByUserId(req.user.sub);
  }
}
