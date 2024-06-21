import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { Repository } from 'typeorm';
import { ClientCreateDTO } from './dto/client.create.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
    ) { }

    public async create(clientCreateDTO: ClientCreateDTO) {
        this.clientRepository.save(clientCreateDTO);
    }

    public async getId(id: number): Promise<ClientEntity> {
        return await this.clientRepository.findOne({ where: { id } });
    }

    public async get(): Promise<ClientEntity[]> {
        return await this.clientRepository.find();
    }
}