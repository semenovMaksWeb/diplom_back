import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity])
    ],
    controllers: [
        ClientController
    ],
    providers: [
        ClientService
    ],
    exports: [
        ClientService
    ]
})
export class ClientModule { }
