import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContractEntity])
    ],
    controllers: [],
    providers: [],
})
export class ContractModule { }
