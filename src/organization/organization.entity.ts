import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "src/client/client.entity";

@Entity("organization")
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @OneToMany(() => ClientEntity, (client) => client.id)
    client: ClientEntity

}