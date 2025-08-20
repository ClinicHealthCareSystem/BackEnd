import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { WhatsappController } from './whatsapp.controller';
import { OTPService } from 'src/shared/services/otp/otp.service';

@Module({
  providers: [WhatsappService, OTPService],
  controllers: [WhatsappController],
  exports: [WhatsappService],
})
export class WhatsappModule {}
