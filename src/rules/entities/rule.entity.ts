import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('rules')
export class Rule {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) owner: User;
  @Column({ default: 'contains' }) matchType: 'contains'|'equals'|'regex';
  @Column() pattern: string;
  @Column({ type: 'text' }) replyText: string;
  @Column({ default: true }) isEnabled: boolean;
  @CreateDateColumn() createdAt: Date;
}
