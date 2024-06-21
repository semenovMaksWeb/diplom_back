import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperEntity } from './developer.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeveloperEntity])
    ],
    controllers: [],
    providers: [],
})
export class DeveloperModule { }
