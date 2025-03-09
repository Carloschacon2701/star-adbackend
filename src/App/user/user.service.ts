import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/Services/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getSingleUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createUser(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    try {
      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role_id: data.role_id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong', {
        cause: error.message,
        description: 'Failed to create user',
      });
    }
  }
}
