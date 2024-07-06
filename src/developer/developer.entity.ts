import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("developer")
export class DeveloperEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column()
    telephone: string;

    @Column({ default: "" })
    password: string;
}