import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SupportService } from './support.service';

@Controller('support')
@UseGuards(JwtAuthGuard)
export class SupportController {
  constructor(private service: SupportService) {}
  @Get() list(@Req() req: any) { return this.service.list(req.user.id); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.service.create(req.user.id, dto); }
  @Post(':id/close') close(@Req() req: any, @Param('id') id: string) { return this.service.close(req.user.id, id); }
}
