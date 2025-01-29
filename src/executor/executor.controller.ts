import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExecutorService } from './executor.service';
import { ExecutorCreateDTO } from './dto/executor.create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator, TypeUserDecorator } from 'src/lib/decorator/user.decorator';
import { UserUpdateActiveDTO } from 'src/lib/dto/user.update.active.dto';

@ApiTags("executor")
@Controller("executor")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ExecutorController {
    constructor(
        private readonly ExecutorService: ExecutorService
    ) { }

    @Post()
    @UserDecorator(TypeUserDecorator.executor)
    public async create(
        @Body() executorCreateDTO: ExecutorCreateDTO
    ) {
        return await this.ExecutorService.create(executorCreateDTO)
    }

        @UserDecorator(TypeUserDecorator.executor)
        @Put()
        public async updated(@Body() userUpdateActive: UserUpdateActiveDTO) {
            return await this.ExecutorService.update(userUpdateActive);
        }
    

    @UserDecorator(TypeUserDecorator.client)
    @Get()
    public async get() {
        return await this.ExecutorService.get();
    }
}
