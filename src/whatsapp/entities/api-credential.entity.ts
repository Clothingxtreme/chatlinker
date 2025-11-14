import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('api_credentials')
export class ApiCredential {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ManyToOne(() => User, { onDelete: 'CASCADE' }) owner: User;
  @Column() phoneNumberId: string;
  @Column() accessToken: string;
}
