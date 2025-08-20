import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './gateway/gatway.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
