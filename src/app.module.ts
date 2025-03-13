import { Module } from '@nestjs/common';

import { PrismaModule } from './Services/DB/prisma.module';
import { AiModule } from './App/ai/ai.module';
import { CompanyModule } from './App/company/company.module';
import { ExcelModule } from './App/excel/excel.module';
import { InvoiceModule } from './App/invoice/invoice.module';
import { ProductModule } from './App/product/product.module';
import { SaleModule } from './App/sale/sale.module';
import { UserModule } from './App/user/user.module';
import { AwsModule } from './Services/AWS/aws.module';
import { AuthGuard } from './Guards/auth.guard';

@Module({
  imports: [
    UserModule,
    ProductModule,
    SaleModule,
    InvoiceModule,
    CompanyModule,
    AiModule,
    ExcelModule,
    AwsModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
