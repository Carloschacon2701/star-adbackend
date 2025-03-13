import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Public } from 'src/decorators/publicRoute.decorator';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.service.getSingleUser(id);
  }

  @Public()
  @Post()
  async postUser(@Body() data: CreateUserDto) {
    return await this.service.createUser(data);
  }
}
