
import { Body, Controller, Get, Headers, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContractService } from './organization.service';
import { OrganizationCreateDTO } from './dto/organization.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';

@ApiTags('organization')
@Controller("organization")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ContractController {
    constructor(
        private readonly contractService: ContractService
    ) { }

    @UserDecorator(TypeUserDecorator.developer)
    @Post()
    public async save(@Body() organizationCreateDTO: OrganizationCreateDTO) {
        return await this.contractService.create(organizationCreateDTO);
    }

    @UserDecorator(TypeUserDecorator.developer)
    @Get()
    @ApiQuery({ name: 'active', required: false })
    public async get(
        @Query("active") active?: boolean
    ) {
        return await this.contractService.get(active);
    }
}
