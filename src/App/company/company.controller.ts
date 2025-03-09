import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('company')
export class CompanyController {
  @Post()
  postCompany() {
    return 'Company';
  }

  @Get()
  getCompanies() {
    return 'Companies';
  }

  @Get(':id')
  getCompany() {
    return 'Company';
  }

  @Put(':id')
  putCompany() {
    return 'Company';
  }

  @Delete(':id')
  deleteCompany() {
    return 'Company';
  }
}
