import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperEntity } from './developer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeveloperEntity])
    ],
    controllers: [
        DeveloperController
    ],
    providers: [
        DeveloperService
    ],
})
export class DeveloperModule { }
