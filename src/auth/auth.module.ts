import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { DeveloperModule } from 'src/developer/developer.module';
import { ClientModule } from 'src/client/client.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        ClientModule,
        DeveloperModule,
        CacheModule.register({ ttl: 100000, max: 1000 })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
})
export class AuthModule { }
