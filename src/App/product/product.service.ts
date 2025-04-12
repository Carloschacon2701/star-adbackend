import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Services/DB/prisma.service';
import { createProductDTO } from './dto/CreateProductDTO';
import { updateProductDTO } from './dto/updateProductDTO';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(user_id: number) {
    return await this.prisma.product.findMany({
      where: {
        company: {
          owner_id: user_id,
        },
      },
    });
  }

  async getProduct(user_id: number, product_id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        company: true,
      },
    });

    if (product?.company.owner_id !== user_id) {
      throw new BadRequestException('Product does not belong to this user');
    }

    return product;
  }

  async createProduct(user_id: number, values: createProductDTO) {
    const company = await this.prisma.company.findFirst({
      where: {
        owner_id: user_id,
      },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const { stock, ...rest } = values;

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        company_id: company.id,
        stocks: {
          create: {
            stock: {
              create: {
                amount: stock,
                previous_amount: 0,
              },
            },
          },
        },
      },
    });

    return product;
  }

  async updateProduct(
    user_id: number,
    product_id: number,
    values: updateProductDTO,
  ) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        company: true,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.company.owner_id !== user_id) {
      throw new BadRequestException('Product does not belong to this user');
    }

    return await this.prisma.product.update({
      where: {
        id: product_id,
      },
      data: {
        ...values,
      },
    });

    return 'Update Product';
  }

  async deleteProduct(user_id: number, product_id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        company: true,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.company.owner_id !== user_id) {
      throw new BadRequestException('Product does not belong to this user');
    }

    return await this.prisma.product.delete({
      where: {
        id: product_id,
      },
    });
  }
}
