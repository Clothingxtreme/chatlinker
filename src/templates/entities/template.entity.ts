import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) owner: User;
  @Column() title: string;
  @Column({ type: 'text' }) body: string;
  @CreateDateColumn() createdAt: Date;
}
