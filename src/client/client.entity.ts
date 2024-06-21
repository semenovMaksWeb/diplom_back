import { ContractEntity } from "src/contract/contract.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => ContractEntity, (contract) => contract.id)
    @JoinColumn({ name: "contract_id" })
    contract: ContractEntity

}