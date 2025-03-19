import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { SaleService } from './sale.service';
import { createSaleDTO } from './dto/createSale.dto';
import { UserId } from 'src/decorators/user.decorator';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  create(@UserId() user_id: number, @Body() data: createSaleDTO) {
    return this.saleService.create(user_id, data);
  }

  @Get()
  findAll(@UserId() user_id: number) {
    return this.saleService.findAll(user_id);
  }

  @Get(':id')
  findOne(@UserId() user_id: number, @Param('id') id: string) {
    return this.saleService.findOne(user_id, +id);
  }

  @Put(':id')
  update(
    @UserId() user_id: number,
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ) {
    return this.saleService.update(user_id, +id, updateUserDto);
  }

  @Delete(':id')
  remove(@UserId() user_id: number, @Param('id') id: string) {
    return this.saleService.remove(user_id, +id);
  }
}
