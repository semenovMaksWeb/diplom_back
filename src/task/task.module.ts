import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskEntity])
    ],
    controllers: [
        TaskController, ],
    providers: [
        TaskService
    ],
})
export class TaskModule { }
