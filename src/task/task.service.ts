import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskCreateDTO } from './dto/task.create.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
    ) { }

    public async create(taskCreateDTO: TaskCreateDTO) {
        const taskEntity = {
            statusTask: { id: 1 },
            client: { id: taskCreateDTO.client_id },
            developer: { id: taskCreateDTO.developer_id },
            message: taskCreateDTO.message,
            theme: taskCreateDTO.message
        }
        return await this.taskRepository.save(taskEntity);
    }
}
