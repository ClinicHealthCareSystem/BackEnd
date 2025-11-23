import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './gateway/gatway.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers:[
      {
      ttl: 60000,  
      limit: 100  
      }
      ],  
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    GatewayModule,
    AgendamentoModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard  
    },
  ],
})
export class AppModule {}
