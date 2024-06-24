import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { StatusTaskModule } from './statusTask/statusTask.module';
import { DeveloperModule } from './developer/developer.module';
import { ContractModule } from './contract/contract.module';
import { DatabaseConfig } from './lib/config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot(DatabaseConfig),
    TaskModule,
    StatusTaskModule,
    DeveloperModule,
    ContractModule,
    ClientModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule { }
