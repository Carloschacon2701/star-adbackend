import { Module } from '@nestjs/common';
import { UserModule } from './App/user/user.module';
import { ProductModule } from './App/product/product.module';
import { SaleModule } from './App/sale/sale.module';
import { InvoiceModule } from './App/invoice/invoice.module';
import { CompanyModule } from './App/company/company.module';
import { AiModule } from './App/ai/ai.module';
import { PrismaService } from './Services/prisma.service';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    SaleModule,
    InvoiceModule,
    CompanyModule,
    AiModule,
    ExcelModule,
  ],
})
export class AppModule {}
