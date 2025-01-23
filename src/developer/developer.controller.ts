import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeveloperService } from './developer.service';
import { DeveloperCreateDTO } from './dto/developer.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator, TypeUserDecorator } from 'src/lib/decorator/user.decorator';
import { UserUpdateActiveDTO } from 'src/lib/dto/user.update.active.dto';

@ApiTags("developer")
@Controller("developer")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DeveloperController {
    constructor(
        private readonly developerService: DeveloperService
    ) { }

    @Post()
    @UserDecorator(TypeUserDecorator.developer)
    public async create(
        @Body() developerCreateDTO: DeveloperCreateDTO
    ) {
        return await this.developerService.create(developerCreateDTO)
    }

        @UserDecorator(TypeUserDecorator.developer)
        @Put()
        public async updated(@Body() userUpdateActive: UserUpdateActiveDTO) {
            return await this.developerService.update(userUpdateActive);
        }
    

    @UserDecorator(TypeUserDecorator.client)
    @Get()
    public async get() {
        return await this.developerService.get();
    }
}
