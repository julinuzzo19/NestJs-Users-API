import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  duration: number;

  @Column()
  description: string;

  @Column({ default: 'PENDING' })
  status?: 'PENDING' | 'DONE' | 'IN_PROGRESS';

  @CreateDateColumn({})
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
