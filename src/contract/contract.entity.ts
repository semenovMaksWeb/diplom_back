import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "src/client/client.entity";

@Entity("contract")
export class ContractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_create: Date;

    @Column({ type: 'date', default: () => "CURRENT_DATE + INTERVAL '1 month'" })
    date_end: Date;

    @ManyToOne(() => ClientEntity, (client) => client.id)
    @JoinColumn({ name: "client_id" })
    client: ClientEntity
}