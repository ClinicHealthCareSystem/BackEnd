import { Module } from '@nestjs/common';
import { UserService } from './medicUser.service';
import { UserController } from './medicUser.controller';
import { PrismaModule } from 'src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
