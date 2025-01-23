import { UserEntity } from "src/auth/user.entity";
import { OrganizationEntity } from "src/organization/organization.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("client")
export class ClientEntity extends UserEntity {

    @ManyToOne(() => OrganizationEntity, (organization) => organization.id)
    @JoinColumn({ name: "organization_id" })
    organization: OrganizationEntity

}