import { Module } from '@nestjs/common';
import { MedicService } from './medicUser.service';
import { UserController } from './medicUser.controller';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [MedicService],
  exports: [MedicService],
})
export class UserModule {}
