import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ExecutorEntity } from './executor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExecutorCreateDTO } from './dto/executor.create.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserUpdateActiveDTO } from 'src/lib/dto/user.update.active.dto';

@Injectable()
export class ExecutorService {
    constructor(
        @InjectRepository(ExecutorEntity)
        private executorRepository: Repository<ExecutorEntity>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    public async create(executorCreateDTO: ExecutorCreateDTO) {
        executorCreateDTO.password = await this.authService.hashPassword(executorCreateDTO.password);
        return await this.executorRepository.save(executorCreateDTO);
    }

    public async update(userUpdateActive: UserUpdateActiveDTO) {
        return await this.executorRepository.save({ id: userUpdateActive.id, active: userUpdateActive.active });
    }   

    public async get() {
        return await this.executorRepository.find({ select: ["id", "name", "surname", "patronymic", "telephone", "active"] });
    }
    public async findTflAndPassword(telephone: string, password: string) {
        const user = await this.executorRepository.findOne({
            where: { telephone: telephone, active: true }
        });
        if (user && await this.authService.checkPassword(password, user.password)) {
            return user;
        }
        return null;
    }
}
