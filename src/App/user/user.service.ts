import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/Services/DB/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { CognitoService } from 'src/Services/AWS/cognito.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cognitoService: CognitoService,
  ) {}

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
      const cognitoUser = await this.cognitoService.signUp(data.email);

      console.log(cognitoUser);

      return await this.prisma.user.create({
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          companies: {
            createMany: {
              data: data.companies.map((company) => ({
                name: company.name,
                field_id: company.field_id,
              })),
            },
          },
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
