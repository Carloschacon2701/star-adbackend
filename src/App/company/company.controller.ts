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
import { UserId } from 'src/decorators/user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postCompany(@UserId() user_id: number, data: createCompanyDto) {
    return await this.service.createCompany(user_id, data);
  }

  @Get()
  async getCompanies(@UserId() user_id: number) {
    return await this.service.getCompanies(user_id);
  }

  @Get(':id')
  async getCompany(@UserId() user_id: number, @Param('id') id: number) {
    return await this.service.getSingleCompany(user_id, id);
  }

  @Put(':id')
  putCompany() {
    return 'Company';
  }

  @Delete(':id')
  deleteCompany(@UserId() user_id: number, @Param('id') id: number) {
    return this.service.removeCompany(user_id, id);
  }
}
