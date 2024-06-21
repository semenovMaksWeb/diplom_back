import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("developer")
export class DeveloperEntity {
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
}