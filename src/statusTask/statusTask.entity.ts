import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("status_task")
export class StatusTaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}