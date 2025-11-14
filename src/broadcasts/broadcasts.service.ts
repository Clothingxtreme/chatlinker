import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcast.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BroadcastRecipient } from './entities/broadcast-recipient.entity';

@Injectable()
export class BroadcastsService {
  constructor(
    @InjectRepository(Broadcast) private bRepo: Repository<Broadcast>,
    @InjectRepository(BroadcastRecipient) private rRepo: Repository<BroadcastRecipient>,
    @InjectQueue('broadcast') private bq: Queue,
  ) {}

  async create(ownerId: string, message: string, recipientPhones: string[], scheduledAt?: Date) {
    const broadcast = await this.bRepo.save(this.bRepo.create({
      owner: { id: ownerId } as any,
      message,
      scheduledAt,
      status: scheduledAt ? 'queued' : 'sending',
    }));

    await this.rRepo.save(recipientPhones.map(phone => this.rRepo.create({
      broadcast: { id: broadcast.id } as any, phone,
    })));

    await this.bq.add('send', { broadcastId: broadcast.id }, scheduledAt ? { delay: Math.max(0, scheduledAt.getTime() - Date.now()) } : {});
    return broadcast;
  }

  stats(ownerId: string) {
    return this.bRepo.find({ where: { owner: { id: ownerId } as any }, relations: ['recipients'] });
  }
}
