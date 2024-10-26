
import { Body, Controller, Get, Headers, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { ContractCreateDTO } from './dto/contract.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { ClientEntity } from 'src/client/client.entity';

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

    @UserDecorator(TypeUserDecorator.developer)
    @Get()
    @ApiQuery({ name: 'client_id', required: false })
    public async get(
        @Query("client_id") clientId?: string,
        @Query("active") active?: string
    ) {
        return await this.contractService.get(clientId, active);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Get("/id")
    public async getWhereClientId(
        @Req() req: any,
        @Query("active") active?: string
    ) {
        const user: ClientEntity = req?.user.user;
        console.log(user);
        return await this.contractService.get(user.id.toString(), active);
    }
}
