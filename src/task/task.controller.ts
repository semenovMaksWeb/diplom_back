import { BadRequestException, Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TaskCreateDTO } from './dto/task.create.dto';
import { TaskService } from './task.service';
import { TypeUserDecorator, UserDecorator } from 'src/lib/decorator/user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientEntity } from 'src/client/client.entity';
import { TaskUpdateDTO } from './dto/task.update.dto';

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
    public async create(
        @Req() req: any,
        @Body() taskCreateDTO: TaskCreateDTO
    ) {
        if (req?.user?.isDeveloper) {
            throw new BadRequestException("Администраторы не создают задачи");
        }
        return await this.taskService.create(taskCreateDTO, req.user.user.id);
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
        return await this.taskService.getAll(+statusId, clientId, developerId);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Get("/id")
    @ApiQuery({ name: 'id', required: true })
    public async getId(
        @Query("id")
        id?: string
    ) {
        const resBd = await this.taskService.getId(+id);
        return await this.taskService.convertTask([resBd])[0];
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
        return await this.taskService.get(+statusId, user.id, developerId);
    }

    @UserDecorator(TypeUserDecorator.client)
    @Put("/status")
    @ApiQuery({ name: 'status_id', required: true })
    @ApiQuery({ name: 'task_id', required: true })
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

    @UserDecorator(TypeUserDecorator.client)
    @Put()
    public async update(
        @Body() taskUpdateDTO: TaskUpdateDTO
    ) {
        return await this.taskService.update(taskUpdateDTO);
    }
}
