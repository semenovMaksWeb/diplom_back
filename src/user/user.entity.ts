import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToMany,
} from 'typeorm';
import { JoinTable } from 'typeorm';
import { TokenEntity } from '../token/token.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true, nullable: false })
    active: boolean;

    @Column({ unique: true, nullable: false })
    email: string;

    @CreateDateColumn()
    create: Date;

    @Column({ nullable: false })
    password: string;

    @ManyToMany(() => TokenEntity, (token) => token.id)
    @JoinTable({ name: 'user_token' })
    token: TokenEntity[];
}