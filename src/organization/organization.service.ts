import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { OrganizationCreateDTO } from './dto/organization.create.dto';
import { OrganizationUpdateDTO } from './dto/organization.update.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(OrganizationEntity)
        private contractRepository: Repository<OrganizationEntity>,
    ) { }

    public async create(organizationCreateDTO: OrganizationCreateDTO) {
        return await this.contractRepository.save(organizationCreateDTO);
    }

    public async update(organizationUpdateDTO: OrganizationUpdateDTO) {
        return await this.contractRepository.save(organizationUpdateDTO);
    }


    public async get(active: boolean = true) {
        if (active !== false) {
            return await this.contractRepository.find({ where: { active: true } });
        }
        return await this.contractRepository.find();
    }
}   
