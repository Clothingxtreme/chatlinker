import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('support_tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) owner: User;
  @Column() subject: string;
  @Column({ type: 'text' }) body: string;
  @Column({ default: 'open' }) status: 'open'|'closed';
  @CreateDateColumn() createdAt: Date;
}
