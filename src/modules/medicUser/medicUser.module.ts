import { Module } from '@nestjs/common';
import { MedicService } from './medicUser.service';
import { MedicController } from './medicUser.controller';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicController],
  providers: [MedicService],
  exports: [MedicService],
})
export class MedicModule {}
