import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, WhatsappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
