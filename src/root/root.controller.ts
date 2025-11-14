import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  getRoot() {
    return { ok: true, tip: 'Use /api/* — e.g., /api/health' };
  }
}
