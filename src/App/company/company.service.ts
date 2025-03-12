import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Services/DB/prisma.service';

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

  async getSingleCompany(company_id: number) {
    return await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
    });
  }

  async removeCompany(company_id: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
      select: {
        active: true,
      },
    });

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

  async createCompany(data: any) {
    const existingCompany = await this.prisma.company.findFirst({
      where: {
        name: data.name,
        owner_id: data.owner_id,
      },
    });

    if (existingCompany) {
      throw new BadRequestException('Company already exists');
    }

    return await this.prisma.company.create({
      data: {
        field_id: data.field_id,
        owner_id: data.owner_id,
        name: data.name,
      },
    });
  }
}
