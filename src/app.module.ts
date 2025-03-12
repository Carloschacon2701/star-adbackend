import { Module } from '@nestjs/common';
import { UserModule } from './App/user/user.module';
import { ProductModule } from './App/product/product.module';
import { SaleModule } from './App/sale/sale.module';
import { InvoiceModule } from './App/invoice/invoice.module';
import { CompanyModule } from './App/company/company.module';
import { AiModule } from './App/ai/ai.module';
import { ExcelModule } from './App/excel/excel.module';
import { AwsModule } from './Services/AWS/aws.module';
import { PrismaModule } from './Services/DB/prisma.module'; // Import the PrismaModule

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
    PrismaModule, // Add PrismaModule to imports
  ],
})
export class AppModule {}
