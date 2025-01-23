import { ContractService } from './organization.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './organization.entity';
import { ContractController } from './organization.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([OrganizationEntity])
    ],
    controllers: [
        ContractController
    ],
    providers: [
        ContractService
    ],
})
export class ContractModule { }
