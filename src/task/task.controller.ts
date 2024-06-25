import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TaskCreateDTO } from './dto/task.create.dto';
import { TaskService } from './task.service';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller("taks")
@ApiTags("task")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }
    
    @UserDecorator(TypeUserDecorator.client)
    @Post()
    public async create(@Body() taskCreateDTO: TaskCreateDTO) {
        return await this.taskService.create(taskCreateDTO);
    }

    @UserDecorator(TypeUserDecorator.developer)
    @Get()
    @ApiQuery({ name: 'status_id', required: false })
    @ApiQuery({ name: 'client_id', required: false })
    @ApiQuery({ name: 'developer_id', required: false })
    public async get(
        @Query("status_id")
        statusId?: string,
        @Query("client_id")
        clientId?: string,
        @Query("developer_id")
        developerId?: string
    ) {
        return await this.taskService.get(+statusId, +clientId, +developerId);
    }
}
