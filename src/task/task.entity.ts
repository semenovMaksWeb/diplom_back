import { ClientEntity } from "src/client/client.entity";
import { ExecutorEntity } from "src/executor/executor.entity";
import { StatusTaskEntity } from "src/statusTask/statusTask.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("task")
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    theme: string;

    @Column()
    message: string;

    @ManyToOne(() => ClientEntity, (client) => client.id)
    @JoinColumn({ name: "client_id" })
    client: ClientEntity

    @ManyToOne(() => ExecutorEntity, (executor) => executor.id)
    @JoinColumn({ name: "executor_id" })
    executor: ExecutorEntity

    @ManyToOne(() => StatusTaskEntity, (statusTask) => statusTask.id)
    @JoinColumn({ name: "status_task_id" })
    statusTask: StatusTaskEntity

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_create: Date;

    @Column({ type: 'date', nullable: true })
    date_end: Date;
}