import { TaskStatusEnum } from '../enum';

export class FilterDto {
  search?: string;
  status?: TaskStatusEnum;
}

export class CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatusEnum;
}

export class UpdateTaskStatusDto {
  status: TaskStatusEnum;
}
