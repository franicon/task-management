import { Task } from './task.entity';
import { CreateTaskDto, FilterDto, UpdateTaskStatusDto } from "./dto";
import { TasksService } from './tasks.service';
import {
  Get,
  Param,
  Controller,
  Body,
  Post,
  Delete,
  Patch, Query
} from "@nestjs/common";
import { DeleteResult } from 'typeorm';
import { TaskStatusEnum } from './enum';

@Controller()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/task/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('/task')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete('/task/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/task/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() taskStatus: UpdateTaskStatusDto,
  ) {
    const { status } = taskStatus;
    return this.taskService.update(id, status);
  }

  @Get('/tasks')
  getTasks(@Query() filterDto: FilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }
}
