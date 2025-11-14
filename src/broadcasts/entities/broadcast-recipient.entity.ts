import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Broadcast } from './broadcast.entity';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity('broadcast_recipients')
export class BroadcastRecipient {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Broadcast, { onDelete: 'CASCADE' }) broadcast: Broadcast;
  @ManyToOne(() => Contact, { onDelete: 'SET NULL', nullable: true }) contact?: Contact;

  @Column() phone: string;
  @Column({ default: 'pending' }) status: 'pending'|'sent'|'delivered'|'failed';
  @Column({ nullable: true }) error?: string;

  @CreateDateColumn() createdAt: Date;
}
