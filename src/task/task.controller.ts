import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    public async get() {
        return await this.taskService.get();
    }
}
