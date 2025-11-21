import { Module } from '@nestjs/common';
import { PlanoController } from './plano.controller';
import { PlanoService } from './plano.service';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlanoController],
  providers: [PlanoService],
})
export class PlanoModule {}
