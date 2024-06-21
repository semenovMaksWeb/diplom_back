import { ContractEntity } from "src/contract/contract.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("client")
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column()
    telephone: string;

    @OneToMany(() => ContractEntity, (contract) => contract.id)
    contract: ContractEntity

}