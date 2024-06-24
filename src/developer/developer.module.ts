import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeveloperEntity } from './developer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([DeveloperEntity])
    ],
    controllers: [
        DeveloperController
    ],
    providers: [
        DeveloperService
    ],
    exports: [
        DeveloperService
    ]
})
export class DeveloperModule { }
