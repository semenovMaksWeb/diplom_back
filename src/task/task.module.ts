import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskEntity])
    ],
    controllers: [],
    providers: [],
})
export class TaskModule { }
