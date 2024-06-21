import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity])
    ],
    controllers: [],
    providers: [],
})
export class ClientModule { }
