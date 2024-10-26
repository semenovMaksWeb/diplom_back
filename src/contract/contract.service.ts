import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ContractEntity } from './contract.entity';
import { ContractCreateDTO } from './dto/contract.create.dto';
import { log } from 'console';

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
    private convertContract(contractEntity: ContractEntity[]) {
        const result = [];
        for (const e of contractEntity) {
            result.push({ id: e.id, date_end: e.date_end, date_create: e.date_create, id_client: e.client.id, name_client: e.client.name })
        }
        return result;
    }

    public async get(clientId: string, active: boolean) {
        const where: any = {};
        if (!clientId) {
            where.client = { id: clientId }
        }
        if (active) {
            where.date_end = "CURRENT_DATE";
        }
        const resultBd = await this.contractRepository.find({ where, relations: ["client"] });
        return this.convertContract(resultBd);
    }
}   
