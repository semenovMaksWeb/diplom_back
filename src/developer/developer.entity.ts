import { UserEntity } from "src/auth/user.entity";
import { Entity } from "typeorm";

@Entity("developer")
export class DeveloperEntity extends UserEntity { }