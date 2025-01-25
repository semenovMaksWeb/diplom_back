import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { Repository } from 'typeorm';
import { ClientCreateDTO } from './dto/client.create.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserUpdateActiveDTO } from 'src/lib/dto/user.update.active.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    public async create(clientCreateDTO: ClientCreateDTO) {
        clientCreateDTO.password = await this.authService.hashPassword(clientCreateDTO.password);
        return await this.clientRepository.save(clientCreateDTO);
    }

    public convertClient(taskEntity: ClientEntity[]) {
        const result = [];
        for (const e of taskEntity) {
            result.push({ id: e.id, name: e.name, surname: e.surname, patronymic: e.patronymic, telephone: e.telephone, name_organization: e.organization.name, active_organization: e.organization.active, active: e.active })
        }
        return result;
    }

    public async getId(id: string): Promise<ClientEntity> {
        const resultBd = await this.clientRepository.findOne({ where: { id }, select: ["id", "name", "surname", "patronymic", "telephone", "organization", 'active'], relations: ["organization"] });
        return this.convertClient([resultBd])[0];
    }

    public async get(): Promise<ClientEntity[]> {
        const resultBd = await this.clientRepository.find({ select: ["id", "name", "surname", "patronymic", "telephone", "organization", 'active'], relations: ["organization"] });
        return this.convertClient(resultBd);
    }

    public async update(userUpdateActive: UserUpdateActiveDTO) {
        return await this.clientRepository.update(userUpdateActive.id, { active: userUpdateActive.active });
    }

    public async findTflAndPassword(telephone: string, password: string) {
        const user = await this.clientRepository.findOne({
            where: { telephone: telephone, active: true, organization: { active: true } }
        })
        if (user && await this.authService.checkPassword(password, user.password)) {
            return user;
        }
        return null;
    };
}