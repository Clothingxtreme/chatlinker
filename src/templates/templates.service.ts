import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  constructor(@InjectRepository(Template) private repo: Repository<Template>) {}
  list(ownerId: string) { return this.repo.find({ where: { owner: { id: ownerId } as any } }); }
  create(ownerId: string, dto: Partial<Template>) { return this.repo.save(this.repo.create({ ...dto, owner: { id: ownerId } as any })); }
  update(ownerId: string, id: string, dto: Partial<Template>) { return this.repo.save({ ...dto, id, owner: { id: ownerId } as any }); }
  async remove(ownerId: string, id: string) { await this.repo.delete({ id, owner: { id: ownerId } as any }); return { deleted: true }; }
}
