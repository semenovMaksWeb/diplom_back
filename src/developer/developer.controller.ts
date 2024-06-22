import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeveloperService } from './developer.service';
import { DeveloperCreateDTO } from './dto/developer.create.dto';

@ApiTags("developer")
@Controller("developer")
export class DeveloperController {
    constructor(
        private readonly developerService: DeveloperService
    ) { }

    @Post()
    public async create(
        @Body() developerCreateDTO: DeveloperCreateDTO
    ) {
        return await this.developerService.create(developerCreateDTO)
    }
}
