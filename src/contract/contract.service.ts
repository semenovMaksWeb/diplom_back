import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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
    private convertContract(contractEntity: ContractEntity[]) {
        const result = [];
        for (const e of contractEntity) {
            result.push({ id: e.id, date_end: e.date_end, date_create: e.date_create, id_client: e.client.id, name_client: e.client.name })
        }
        return result;
    }

    public async get(clientId: string, active: string) {
        const where: any = {};
        if (clientId) {
            where.client = { id: clientId }
        }

        console.log(active);

        if (active == "true") {
            console.log("какого хуЯ?");

            where.date_end = Raw((alias: string) => `${alias} > NOW()`)
        }
        console.log(where);

        const resultBd = await this.contractRepository.find({ where, relations: ["client"] });
        return this.convertContract(resultBd);
    }
}   
