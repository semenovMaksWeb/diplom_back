import { StatusTaskService } from './statustask.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusTaskEntity } from './statusTask.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([StatusTaskEntity])
    ],
    controllers: [],
    providers: [
        StatusTaskService,
    ],
})
export class StatusTaskModule { }
