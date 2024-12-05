import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusTaskEntity } from './statusTask.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusTaskService {
    constructor(
        @InjectRepository(StatusTaskEntity)
        private statusTaskRepository: Repository<StatusTaskEntity>,
    ) {
        const data = [
            { id: 1, name: "Создана", description: "Задача созданная клиентом" },
            { id: 2, name: "В работе", description: "Задача в ходе выполнение разработчиком" },
            { id: 3, name: "В проверке", description: "Задача требует проверку клиентом" },
            { id: 4, name: "Выполнена", description: "Задача подверждена клиентом" },
            { id: 5, name: "Отмененна", description: "Задача отмененная клиентом" },
        ];
        this.statusTaskRepository.save(data)
    }

    async getId(id: string) {
        return await this.statusTaskRepository.find({ where: { id: +id } })
    }

    async getAll() {
        return await this.statusTaskRepository.find();
    }
}
