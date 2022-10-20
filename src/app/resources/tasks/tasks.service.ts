import { Task } from './task.entity';
import { TaskStatusEnum } from './enum';
import { CreateTaskDto, FilterDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    return await query.getMany();
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Opps');
    } else {
      return found;
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    const found = await this.getTaskById(id);
    if (found) {
      return await this.tasksRepository.delete(id);
    } else {
      throw new NotFoundException();
    }
  }

  async update(id: string, status: TaskStatusEnum): Promise<Task> {
    const found = await this.getTaskById(id);
    if (found) {
      found.status = status;
      await this.tasksRepository.save(found);
    } else {
      throw new NotFoundException();
    }
    return found;
  }
}
