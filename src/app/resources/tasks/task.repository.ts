import { Task } from './task.entity';
import { CreateTaskDto } from './dto';
import { TaskStatusEnum } from './enum';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });

    await this.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = this.findOne(id);
    if (!found) {
      throw new NotFoundException();
    } else {
      return found;
    }
  }

  async deleteTask(id: string): Promise<Task[]> {
    const task = this.getTaskById(id);
    if (task) {
      await this.delete(await task);
      return this.find();
    } else {
      throw new NotFoundException();
    }
  }
}
