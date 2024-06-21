import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientCreateDTO } from './dto/client.create.dto';

@ApiTags('client')
@Controller("client")
export class ClientController {
    constructor(
        private readonly clientService: ClientService
    ) { }

    @Post()
    public async create(@Body() clientCreateDTO: ClientCreateDTO) {
        await this.clientService.create(clientCreateDTO);
    }

    @Get()
    public async get() {
        return await this.clientService.get();
    }

    @Get(":id")
    public async getId(@Param("id") id: string) {
        return await this.clientService.getId(+id);
    }
}
