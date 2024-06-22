import { Injectable } from '@nestjs/common';
import { DeveloperEntity } from './developer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeveloperCreateDTO } from './dto/developer.create.dto';

@Injectable()
export class DeveloperService {
    constructor(
        @InjectRepository(DeveloperEntity)
        private developerRepository: Repository<DeveloperEntity>,
    ) { }

    public async create(developerCreateDTO: DeveloperCreateDTO) {
        return await this.developerRepository.save(developerCreateDTO);
    }
}
