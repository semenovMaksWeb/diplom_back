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

    public async get(statusId: number, clientId: number, developerId: number) {
        return await this.taskRepository.find({
            relations: ["client", "developer", "statusTask"],
            where: this.genetatorWhereGet(statusId, clientId, developerId)
        });
    }

    private genetatorWhereGet(statusId: number, clientId: number, developerId: number) {
        const where: any = {};
        if (!Number.isNaN(statusId)) {
            where.statusTask = { id: statusId }
        }
        if (!Number.isNaN(clientId)) {
            where.client = { id: clientId }
        }
        if (!Number.isNaN(developerId)) {
            where.developer = { id: developerId }
        }
        return where;
    }
}
