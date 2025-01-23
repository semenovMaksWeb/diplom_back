import { Body, Controller, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientCreateDTO } from './dto/client.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { ClientEntity } from './client.entity';
import { UserUpdateActiveDTO } from 'src/lib/dto/user.update.active.dto';

@ApiTags('client')
@Controller("client")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) { }

    @UserDecorator(TypeUserDecorator.developer)
    @Post()
    public async create(@Body() clientCreateDTO: ClientCreateDTO) {
        return await this.clientService.create(clientCreateDTO);
    }

    @UserDecorator(TypeUserDecorator.developer)
    @Get()
    public async get() {
        return await this.clientService.get();
    }


    @UserDecorator(TypeUserDecorator.developer)
    @Put()
    public async updated(@Body() userUpdateActive: UserUpdateActiveDTO) {
        return await this.clientService.update(userUpdateActive);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Get("/id")
    public async getId(@Req() req: any) {
        const user: ClientEntity = req?.user.user;
        return await this.clientService.getId(user.id);
    }
}
