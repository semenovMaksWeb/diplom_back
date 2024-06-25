import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ContractEntity } from './contract.entity';
import { ContractCreateDTO } from './dto/contract.create.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity)
        private contractRepository: Repository<ContractEntity>,
    ) { }

    public create(contractCreateDTO: ContractCreateDTO) {
        const contractEntity = { client: { id: contractCreateDTO.clientId } }
        this.contractRepository.save(contractEntity);
    }

    public async getWhereClientId(clientId: number): Promise<ContractEntity[]> {
        const where: any = { client: { id: clientId } };
        return await this.contractRepository.find({ where: where, relations: ["client"] });
    }

    public async get(clientId: number): Promise<ContractEntity[]> {
        const where: any = {};
        if (!isNaN(clientId)) {
            where.client = { id: clientId }
        }
        return await this.contractRepository.find({ where, relations: ["client"] });
    }
}   
