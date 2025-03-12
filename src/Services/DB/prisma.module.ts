import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Add the Global decorator
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
