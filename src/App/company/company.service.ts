import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Services/DB/prisma.service';
import { createCompanyDto } from './dto/createCompany.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanies(user_id: number) {
    return await this.prisma.company.findMany({
      where: {
        owner_id: user_id,
      },
    });
  }

  async getSingleCompany(user_id: number, company_id: number) {
    return await this.prisma.company.findUnique({
      where: {
        id: company_id,
        owner_id: user_id,
      },
    });
  }

  async removeCompany(user_id: number, company_id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: company_id,
        owner_id: user_id,
      },
      select: {
        active: true,
      },
    });

    if (!company) {
      throw new BadRequestException("Company doesn't exist for this user");
    }

    if (!company?.active) {
      throw new BadRequestException('Company is already inactive');
    }

    return await this.prisma.company.update({
      where: {
        id: company_id,
      },
      data: {
        active: false,
      },
    });
  }

  async createCompany(user_id: number, data: createCompanyDto) {
    const existingCompany = await this.prisma.company.findFirst({
      where: {
        name: data.name,
        owner_id: user_id,
      },
    });

    if (existingCompany) {
      throw new BadRequestException('Company already exists');
    }

    return await this.prisma.company.create({
      data: {
        field_id: data.field_id,
        owner_id: user_id,
        name: data.name,
      },
    });
  }
}
