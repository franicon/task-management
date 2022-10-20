import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TasksService } from './tasks.service';
import { FilterDto, CreateTaskDto, UpdateTaskStatusDto } from './dto';
import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';

@Controller()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('/task')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/task/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Get('/tasks')
  getTasks(@Query() filterDto: FilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Patch('/task/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatus: UpdateTaskStatusDto,
  ) {
    const { status } = taskStatus;
    return this.taskService.update(id, status);
  }

  @Delete('/task/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.deleteTask(id);
  }
}
