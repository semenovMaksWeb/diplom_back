
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { ContractCreateDTO } from './dto/contract.create.dto';

@ApiTags('contract')
@Controller("contract")
export class ContractController {
    constructor(
        private readonly contractService: ContractService
    ) { }

    @Post()
    public async save(@Body() contractCreateDTO: ContractCreateDTO) {
        await this.contractService.create(contractCreateDTO);
    }

    @Get()
    public async get(@Query('client_id') client_id: string) {
        return await this.contractService.getWhereClientId(+client_id);
    }
}
