import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createCompanyDto } from './dto/createCompany.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postCompany(data: createCompanyDto) {
    return await this.service.createCompany(data);
  }

  @Get()
  async getCompanies() {
    return await this.service.getCompanies(1);
  }

  @Get(':id')
  async getCompany(@Param('id') id: number) {
    return await this.service.getSingleCompany(id);
  }

  @Put(':id')
  putCompany() {
    return 'Company';
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: number) {
    return this.service.removeCompany(id);
  }
}
