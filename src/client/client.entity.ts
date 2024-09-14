import { UserEntity } from "src/auth/user.entity";
import { ContractEntity } from "src/contract/contract.entity";
import { Entity, OneToMany } from "typeorm";

@Entity("client")
export class ClientEntity extends UserEntity {

    @OneToMany(() => ContractEntity, (contract) => contract.id)
    contract: ContractEntity

}