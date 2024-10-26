import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { Repository } from 'typeorm';
import { ClientCreateDTO } from './dto/client.create.dto';
import { AuthService } from 'src/auth/auth.service';

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

    public async getId(id: string): Promise<ClientEntity> {
        return await this.clientRepository.findOne({ where: { id }, select: ["id", "name", "surname", "patronymic", "telephone"] });
    }

    public async get(): Promise<ClientEntity[]> {
        return await this.clientRepository.find({ select: ["id", "name", "surname", "patronymic", "telephone"] });
    }
    public async findTflAndPassword(telephone: string, password: string) {
        const user = await this.clientRepository.findOne({
            where: { telephone: telephone, }
        })
        if (user && await this.authService.checkPassword(password, user.password)) {
            return user;
        }
        return null;
    };
}