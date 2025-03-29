import { Controller, Get, Header, Res } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Response } from 'express';
import { Public } from 'src/decorators/publicRoute.decorator';

@Controller('invoice')
export class InvoiceController {
  constructor(private service: InvoiceService) {}

  @Get()
  @Public()
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="Invoice.pdf"')
  getInvoice(@Res() res: Response) {
    return this.service.create(res);
  }
}
