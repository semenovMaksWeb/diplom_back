import { ContractService } from './contract.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { ContractController } from './contract.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ContractEntity])
    ],
    controllers: [
        ContractController
    ],
    providers: [
        ContractService
    ],
})
export class ContractModule { }
