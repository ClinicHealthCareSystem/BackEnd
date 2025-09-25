import { Module } from '@nestjs/common';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { MicroServiceModule } from './micro-service/micro-service.module';

@Module({
  imports: [WhatsappModule, MicroServiceModule],
  exports: [WhatsappModule, MicroServiceModule],
})
export class GatewayModule {}
