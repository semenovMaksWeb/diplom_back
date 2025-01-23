import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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


    @Column({ default: true })
    active: boolean;
}