import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { UserId } from 'src/decorators/user.decorator';
import { createProductDTO } from './dto/CreateProductDTO';
import { updateProductDTO } from './dto/updateProductDTO';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@UserId() user_id: number) {
    return await this.productService.getProducts(user_id);
  }

  @Get(':id')
  async getProduct(@UserId() user_id: number, @Param('id') id: number) {
    return await this.productService.getProduct(user_id, id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @UserId() user_id: number,
    @Body() data: createProductDTO,
  ) {
    return await this.productService.createProduct(user_id, data);
  }

  @Put(':id')
  async updateProduct(
    @UserId() user_id: number,
    @Param('id') id: number,
    @Body() data: updateProductDTO,
  ) {
    return await this.productService.updateProduct(user_id, id, data);
  }

  @Delete(':id')
  async deleteProduct(@UserId() user_id: number, @Param('id') id: number) {
    return await this.productService.deleteProduct(user_id, id);
  }
}
