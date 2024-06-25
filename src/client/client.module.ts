import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity]),
        forwardRef(() => AuthModule),
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
