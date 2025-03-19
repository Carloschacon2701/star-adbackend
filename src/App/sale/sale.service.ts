import { BadRequestException, Injectable } from '@nestjs/common';
import { createSaleDTO } from './dto/createSale.dto';
import { PrismaService } from 'src/Services/DB/prisma.service';

@Injectable()
export class SaleService {
  constructor(private prismaService: PrismaService) {}

  async findAll(user_id: number) {
    return await this.prismaService.sale.findMany({
      where: {
        product: {
          company: {
            owner_id: user_id,
          },
        },
      },
    });
  }

  async findOne(user_id: number, id: number) {
    return await this.prismaService.sale.findUnique({
      where: {
        id: id,
        product: {
          company: {
            owner_id: user_id,
          },
        },
      },
    });
  }

  async create(user_id: number, data: createSaleDTO) {
    const productPromise = this.prismaService.product.findUnique({
      where: {
        id: data.product_id,
        company: {
          owner_id: user_id,
        },
      },
      select: {
        id: true,
        price: true,
        company_id: true,
      },
    });

    const clientPromise = this.prismaService.client.findUnique({
      where: {
        identification: data.client_identification,
      },
    });

    let [product, client] = await Promise.all([productPromise, clientPromise]);

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    const productStock = await this.prismaService.product_stock.findFirst({
      orderBy: {
        created_at: 'desc',
      },
      where: {
        product_id: product.id,
        active: true,
      },
      include: {
        stock: true,
      },
    });

    if (!productStock || productStock?.stock?.amount < data.amount) {
      throw new BadRequestException('Product out of stock');
    }

    const total = product.price * data.amount;

    this.prismaService.product_stock.updateMany({
      where: {
        NOT: {
          id: productStock.id,
        },
      },
      data: {
        active: false,
      },
    });

    const newStock = await this.prismaService.stock.create({
      data: {
        amount: productStock.stock.amount - data.amount,
        previous_amount: productStock.stock.amount,
      },
    });

    await this.prismaService.product_stock.create({
      data: {
        product_id: product.id,
        stock_id: newStock?.id,
      },
    });

    if (!client) {
      client = await this.prismaService.client.create({
        data: {
          identification: data.client_identification,
          company_id: product.company_id,
          name: data.client_name,
        },
      });
    }

    const sale = await this.prismaService.sale.create({
      data: {
        amount: data?.amount,
        date: new Date(data?.date),
        product_id: product.id,
        total: total,
        client_id: client?.id,
      },
    });

    console.log(sale);
    return sale;
  }

  async update(user_id: number, id: number, data: createSaleDTO) {}

  async remove(user_id: number, id: number) {}
}
