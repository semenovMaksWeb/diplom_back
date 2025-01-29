import { ExecutorController } from './executor.controller';
import { ExecutorService } from './executor.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutorEntity } from './executor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([ExecutorEntity])
    ],
    controllers: [
        ExecutorController
    ],
    providers: [
        ExecutorService
    ],
    exports: [
        ExecutorService
    ]
})
export class ExecutorModule { }
