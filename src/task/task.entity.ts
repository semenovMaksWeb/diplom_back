import { ClientEntity } from "src/client/client.entity";
import { DeveloperEntity } from "src/developer/developer.entity";
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

    @ManyToOne(() => DeveloperEntity, (developer) => developer.id)
    @JoinColumn({ name: "developer_id" })
    developer: DeveloperEntity

    @ManyToOne(() => StatusTaskEntity, (statusTask) => statusTask.id)
    @JoinColumn({ name: "status_task_id" })
    statusTask: StatusTaskEntity

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_create: Date;

    @Column({ type: 'date' })
    date_end: Date;
}