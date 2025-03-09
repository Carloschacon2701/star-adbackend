import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, ProductModule, SaleModule, InvoiceModule, CompanyModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
