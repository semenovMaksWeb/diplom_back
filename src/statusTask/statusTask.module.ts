import { StatusTaskService } from './statusTask.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusTaskEntity } from './statusTask.entity';
import { StatusTaskController } from './StatusTask.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([StatusTaskEntity])
    ],
    controllers: [
        StatusTaskController,
    ],
    providers: [
        StatusTaskService,
    ],
})
export class StatusTaskModule { }
