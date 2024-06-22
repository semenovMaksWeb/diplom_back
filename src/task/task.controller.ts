import { Body, Controller, Post } from '@nestjs/common';
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
    create(@Body() taskCreateDTO: TaskCreateDTO) {
        this.taskService.create(taskCreateDTO);
    }
}
