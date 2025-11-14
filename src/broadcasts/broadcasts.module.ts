import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Broadcast } from './entities/broadcast.entity';
import { BroadcastRecipient } from './entities/broadcast-recipient.entity';
import { BroadcastsController } from './broadcasts.controller';
import { BroadcastsService } from './broadcasts.service';
import { BroadcastProcessor } from './processors/broadcast.processor';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Broadcast, BroadcastRecipient]),
    BullModule.registerQueue({ name: 'broadcast' }),
    WhatsappModule,
  ],
  controllers: [BroadcastsController],
  providers: [BroadcastsService, BroadcastProcessor],
})
export class BroadcastsModule {}
