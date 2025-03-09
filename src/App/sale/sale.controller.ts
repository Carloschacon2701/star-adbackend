import { Controller, Get } from '@nestjs/common';

@Controller('sale')
export class SaleController {
  @Get()
  async findAll(): Promise<string> {
    return 'Sales';
  }
}
