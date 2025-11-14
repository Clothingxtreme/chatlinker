import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BroadcastsService } from './broadcasts.service';

@UseGuards(JwtAuthGuard)
@Controller('broadcasts')
export class BroadcastsController {
  constructor(private service: BroadcastsService) {}

  @Post()
  create(@Req() req: any, @Body() body: { message: string; recipients: string[]; scheduledAt?: string }) {
    return this.service.create(req.user.id, body.message, body.recipients, body.scheduledAt ? new Date(body.scheduledAt) : undefined);
  }

  @Get('stats')
  stats(@Req() req: any) { return this.service.stats(req.user.id); }
}
