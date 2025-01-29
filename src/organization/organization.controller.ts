
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContractService } from './organization.service';
import { OrganizationCreateDTO } from './dto/organization.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { OrganizationUpdateDTO } from './dto/organization.update.dto';

@ApiTags('organization')
@Controller("organization")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ContractController {
    constructor(
        private readonly contractService: ContractService
    ) { }

    @UserDecorator(TypeUserDecorator.executor)
    @Post()
    public async save(@Body() organizationCreateDTO: OrganizationCreateDTO) {
        return await this.contractService.create(organizationCreateDTO);
    }

    @UserDecorator(TypeUserDecorator.executor)
    @Put()
    public async update(@Body() organizationUpdateDTO: OrganizationUpdateDTO) {
        return await this.contractService.create(organizationUpdateDTO);
    }

    @UserDecorator(TypeUserDecorator.executor)
    @Get()
    @ApiQuery({ name: 'active', required: false })
    public async get(
        @Query("active") active?: boolean
    ) {
        return await this.contractService.get(active);
    }
}
