import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientCreateDTO } from './dto/client.create.dto';

@ApiTags('client')
@Controller("client")
export class ClientController {
    constructor(
        private readonly contractService: ClientService
    ) { }

    @Post()
    public async create(clientCreateDTO: ClientCreateDTO) {
        await this.contractService.create(clientCreateDTO);
    }

    @Get()
    public async get() {
        return await this.contractService.get();
    }

    @Get(":id")
    public async getId(@Param("id") id: string) {
        return await this.contractService.getId(+id);
    }
}
