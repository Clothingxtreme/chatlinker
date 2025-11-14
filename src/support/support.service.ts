import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class SupportService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}
  list(ownerId: string) { return this.repo.find({ where: { owner: { id: ownerId } as any }, order: { createdAt: 'DESC' } }); }
  create(ownerId: string, dto: Partial<Ticket>) { return this.repo.save(this.repo.create({ ...dto, owner: { id: ownerId } as any })); }
  close(ownerId: string, id: string) { return this.repo.save({ id, owner: { id: ownerId } as any, status: 'closed' }); }
}
