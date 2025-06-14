import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { TaskCreateDTO } from './dto/task.create.dto';
import { TaskUpdateDTO } from './dto/task.update.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
    ) { }


    public convertTask(taskEntity: TaskEntity[]) {
        const result = [];
        for (const e of taskEntity) {
            result.push({ id: e.id, theme: e.theme, message: e.message, date_create: e.date_create, date_end: e.date_end, client_name: e.client.name, developer_name: e.executor.name, status_name: e.statusTask.name, executor_id: e.executor.id })
        }
        return result;
    }

    public async create(taskCreateDTO: TaskCreateDTO, userId: string) {
        const taskEntity = {
            statusTask: { id: 1 },
            client: { id: userId },
            executor: { id: taskCreateDTO.executor_id },
            message: taskCreateDTO.message,
            theme: taskCreateDTO.theme
        }

        return await this.taskRepository.save(taskEntity);
    }

    public async getAll(statusId: number, clientId: string, executorId: string) {
        const resBd = await this.taskRepository.find({
            relations: ["client", "executor", "statusTask"],
            where: this.genetatorWhereGet(statusId, clientId, executorId)
        });
        return this.convertTask(resBd);
    }

    public async get(statusId: number, clientId: string, executorId: string) {
        const resBd = await this.taskRepository.find({
            relations: ["client", "executor", "statusTask"],
            where: this.genetatorWhereGet(statusId, clientId, executorId)
        });
        return this.convertTask(resBd);
    }

    public async updateStatus(statusId: number, taskId: number, userId: string) {
        const taks: TaskEntity = await this.getId(taskId);
        if (taks.statusTask.id == statusId) {
            throw new BadRequestException("Текущий статус задачи уже указан");
        }
        switch (statusId) {
            case 1:
                throw new BadRequestException("Нельзя изменить статус задачи на Создана");
            case 2:
                this.checkExecutorTask(taks, userId)
                break;
            case 3:
                this.checkExecutorTask(taks, userId)
                this.checkNotTaskStatus(taks, 2, "Нельзя изменить статус задачи на 'в проверке', если она не в статусе 'В работe'")
                break;
            case 4:
                this.checkClientTask(taks, userId)
                this.checkNotTaskStatus(taks, 3, "Нельзя изменить статус задачи на 'Выполнена', если она не в статусе 'В проверке'")
                break;
            case 5:
                this.checkClientTask(taks, userId)
                this.checkTaskStatus(taks, 3, "Нельзя изменить статус задачи на 'Отмененна', если она в статусе 'В проверке'");
                this.checkTaskStatus(taks, 4, "Нельзя изменить статус задачи на 'Отмененна', если она в статусе 'Выполнена'");
                break;
        }
        return await this.taskRepository.save({ id: taskId, statusTask: { id: statusId } })
    }


    // проверка что статус не равен указанному
    private checkNotTaskStatus(taks: TaskEntity, statusId: number, textError: string) {
        if (taks.statusTask.id != statusId) {
            throw new BadRequestException(textError);
        }
    }
    // проверка что статус равен указанному
    private checkTaskStatus(taks: TaskEntity, statusId: number, textError: string) {
        if (taks.statusTask.id == statusId) {
            throw new BadRequestException(textError);
        }
    }


    // проверка что пользователь разработчик
    private checkExecutorTask(taks: TaskEntity, userId: string) {
        if (taks.executor.id != userId) {
            throw new BadRequestException("Только испольнитель может взять задачу в работу");
        }
    }

    // проверка что пользователь клиент
    private checkClientTask(taks: TaskEntity, userId: string) {
        if (taks.client.id != userId) {
            throw new BadRequestException("Только автор задачи может отметить задачу");
        }
    }

    public async getId(id: number) {
        return await this.taskRepository.findOne({
            relations: ["client", "executor", "statusTask"],
            where: { id: id }
        });
    }


    private genetatorWhereGet(statusId: number, clientId: string, executorId: string) {
        const where: any = {};
        if (!Number.isNaN(statusId)) {
            where.statusTask = { id: statusId }
        }
        if (!Number.isNaN(clientId)) {
            where.client = { id: clientId }
        }
        if (!Number.isNaN(executorId)) {
            where.executor = { id: executorId }
        }

        console.log(where);

        return where;
    }

    public async update(taskUpdateDTO: TaskUpdateDTO) {
        return await this.taskRepository.save(
            {
                id: taskUpdateDTO.id,
                theme: taskUpdateDTO.theme,
                executor: { id: taskUpdateDTO.executor_id },
                message: taskUpdateDTO.message
            }
        )
    }
}
