import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "src/client/client.entity";

@Entity("contract")
export class ContractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_create: Date;

    @Column({ type: 'date', default: () => "CURRENT_DATE + INTERVAL '1 month'" })
    date_create_end: Date;

    @OneToMany(() => ClientEntity, (client) => client.id)
    client: ClientEntity

    @Column()
    text: string

}