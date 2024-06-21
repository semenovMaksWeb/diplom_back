import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, type: 'text' })
    value: string;

    @Column({ nullable: false, default: true })
    active: boolean;

    @Column({ type: 'timestamp', nullable: false })
    date: Date;

    @ManyToMany(() => UserEntity, (user) => user.id)
    user: UserEntity[];
}