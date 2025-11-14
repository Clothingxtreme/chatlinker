import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Broadcast } from '../entities/broadcast.entity';
import { BroadcastRecipient } from '../entities/broadcast-recipient.entity';
import { WhatsappService } from '../../whatsapp/whatsapp.service';

@Processor('broadcast')
export class BroadcastProcessor {
  constructor(
    @InjectRepository(Broadcast) private bRepo: Repository<Broadcast>,
    @InjectRepository(BroadcastRecipient) private rRepo: Repository<BroadcastRecipient>,
    private wa: WhatsappService,
  ) {}

  @OnQueueActive()
  async markSending(job: Job) {
    const { broadcastId } = job.data;
    await this.bRepo.update(broadcastId, { status: 'sending' });
  }

  @Process('send')
  async handleSend(job: Job) {
    const { broadcastId } = job.data;
    const broadcast = await this.bRepo.findOne({ where: { id: broadcastId } });
    const recipients = await this.rRepo.find({ where: { broadcast: { id: broadcastId } as any } });

    for (const r of recipients) {
      try {
        await this.wa.sendText(r.phone, broadcast!.message);
        await this.rRepo.update(r.id, { status: 'sent' });
      } catch (e: any) {
        await this.rRepo.update(r.id, { status: 'failed', error: (e.message || '').slice(0, 200) });
      }
    }
    await this.bRepo.update(broadcastId, { status: 'completed' });
  }
}
