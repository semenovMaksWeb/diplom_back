import { ContractModule } from './contract/contract.module';
import { ClientModule } from './client/client.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './lib/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ContractModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
