import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module, forwardRef } from '@nestjs/common';
import { ExecutorModule } from 'src/executor/executor.module';
import { ClientModule } from 'src/client/client.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        forwardRef(() => ExecutorModule),
        ClientModule,
        CacheModule.register({ ttl: 0, max: 1000 })
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
