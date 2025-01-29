import { UserEntity } from "src/auth/user.entity";
import { Entity } from "typeorm";

@Entity("executor")
export class ExecutorEntity extends UserEntity { }