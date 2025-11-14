import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private repo: Repository<Contact>) {}

  list(ownerId: string) {
    return this.repo.find({ where: { owner: { id: ownerId } as any }, order: { createdAt: 'DESC' } });
  }
  create(ownerId: string, dto: Partial<Contact>) {
    return this.repo.save(this.repo.create({ ...dto, owner: { id: ownerId } as any }));
  }
  update(ownerId: string, id: string, dto: Partial<Contact>) {
    return this.repo.save({ ...dto, id, owner: { id: ownerId } as any });
  }
  async remove(ownerId: string, id: string) {
    await this.repo.delete({ id, owner: { id: ownerId } as any });
    return { deleted: true };
  }
}
