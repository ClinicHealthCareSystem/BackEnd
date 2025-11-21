import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/services/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GatewayModule } from './gateway/gatway.module';
// import { AgendamentoModule } from './modules/agendamento/agendamento.module';
import { HttpModule } from '@nestjs/axios';
import { PlanoModule } from './modules/plano/plano.module';
import { MedicModule } from './modules/medicUser/medicUser.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    MedicModule,
    AuthModule,
    GatewayModule,
    // AgendamentoModule,
    HttpModule,
    PlanoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
