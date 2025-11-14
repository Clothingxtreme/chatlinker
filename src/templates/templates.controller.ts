import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { TemplatesService } from './templates.service';

@Controller('templates')
@UseGuards(JwtAuthGuard)
export class TemplatesController {
  constructor(private service: TemplatesService) {}
  @Get() list(@Req() req: any) { return this.service.list(req.user.id); }
  @Post() create(@Req() req: any, @Body() dto: any) { return this.service.create(req.user.id, dto); }
  @Put(':id') update(@Req() req: any, @Param('id') id: string, @Body() dto: any) { return this.service.update(req.user.id, id, dto); }
  @Delete(':id') remove(@Req() req: any, @Param('id') id: string) { return this.service.remove(req.user.id, id); }
}
