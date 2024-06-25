
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { ContractCreateDTO } from './dto/contract.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';

@ApiTags('contract')
@Controller("contract")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ContractController {
    constructor(
        private readonly contractService: ContractService
    ) { }

    @UserDecorator(TypeUserDecorator.developer)
    @Post()
    public async save(@Body() contractCreateDTO: ContractCreateDTO) {
        await this.contractService.create(contractCreateDTO);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Get()
    public async get(@Query('client_id') client_id: string) {
        return await this.contractService.getWhereClientId(+client_id);
    }
}
