import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TaskCreateDTO } from './dto/task.create.dto';
import { TaskService } from './task.service';

@Controller("taks")
@ApiTags("task")

export class TaskController {
    constructor(
        private readonly taskService: TaskService,
    ) { }
    @Post()
    public async create(@Body() taskCreateDTO: TaskCreateDTO) {
        return await this.taskService.create(taskCreateDTO);
    }

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
