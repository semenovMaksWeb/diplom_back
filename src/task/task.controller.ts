import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TaskCreateDTO } from './dto/task.create.dto';
import { TaskService } from './task.service';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientEntity } from 'src/client/client.entity';

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
    @Get("/all")
    @ApiQuery({ name: 'status_id', required: false })
    @ApiQuery({ name: 'client_id', required: false })
    @ApiQuery({ name: 'developer_id', required: false })
    public async getAll(
        @Query("status_id")
        statusId?: string,
        @Query("client_id")
        clientId?: string,
        @Query("developer_id")
        developerId?: string
    ) {
        return await this.taskService.getAll(+statusId, +clientId, +developerId);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Get()
    @ApiQuery({ name: 'status_id', required: false })
    @ApiQuery({ name: 'developer_id', required: false })
    public async get(
        @Req() req: any,
        @Query("status_id")
        statusId?: string,
        @Query("developer_id")
        developerId?: string,
    ) {
        const user: ClientEntity = req?.user.user;
        return await this.taskService.get(+statusId, user.id, +developerId);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Put()
    @ApiQuery({ name: 'status_id', required: true })
    @ApiQuery({ name: 'status_id', required: true })
    public async updateStatus(
        @Req() req: any,
        @Query("status_id")
        statusId?: string,
        @Query("task_id")
        taskId?: string,
    ) {
        const user: ClientEntity = req?.user.user;
        return await this.taskService.updateStatus(+statusId, +taskId, user.id);
    }
}
