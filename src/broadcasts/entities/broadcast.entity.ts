import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BroadcastRecipient } from './broadcast-recipient.entity';

@Entity('broadcasts')
export class Broadcast {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) owner: User;

  @Column() message: string;
  @Column({ type: 'timestamptz', nullable: true }) scheduledAt?: Date;
  @Column({ default: 'draft' }) status: 'draft'|'queued'|'sending'|'completed'|'failed';

  @OneToMany(() => BroadcastRecipient, (r) => r.broadcast) recipients: BroadcastRecipient[];

  @CreateDateColumn() createdAt: Date;
}
