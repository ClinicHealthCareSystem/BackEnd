import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { OTPService } from 'src/shared/services/otp/otp.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly otpService: OTPService,
  ) {}

  @Get('/status')
  getStatus() {
    return {
      connected: this.whatsappService.getConnectionStatus(),
      timestamp: new Date().toTimeString,
    };
  }

  @Post('/sendMessage')
  async sendMessage(
    @Body() body: { phone: string; message: string },
  ): Promise<{ success: boolean; message: string }> {
    try {
      const jid = body.phone.includes('@')
        ? body.phone
        : `${body.phone}@s.whatsapp.net`;

      await this.whatsappService.sendMessage(jid, body.message);
      return {
        success: true,
        message: 'message sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('/sendVerificationCode')
  async sendVerificationCode(@Body() body: { phone: string }) {
    try {
      const phoneRegex = /^\d{10,11}$/;
      if (!phoneRegex.test(body.phone)) {
        throw new BadRequestException('Invalid phone format');
      }

      const phoneWithDDI = `55${body.phone}`;
      const verificationCode = this.otpService.generateOTP();

      const message = `Seu código de verificação é: ${verificationCode}, válido por 1 minuto`;
      const jid = `${phoneWithDDI}@s.whatsapp.net`;
      await this.whatsappService.sendMessage(jid, message);

      await this.otpService.storeOTP(phoneWithDDI, verificationCode);

      return {
        sucess: true,
        message: 'Code sent successfully',
      };
    } catch (error) {
      return {
        sucess: false,
        message: `Error sending verification code: ${error.message}`,
      };
    }
  }

  @Post('/verifyCodeAuthenticator')
  async verifyCode(@Body() body: { phone: string; code: string }) {
    const phoneWithDDI = `55${body.phone}`;

    const validation = await this.otpService.validateCode(
      phoneWithDDI,
      body.code,
    );

    if (!validation.valid) {
      return {
        sucess: false,
        message: validation.message,
      };
    }

    return {
      success: true,
      messsage: 'Valid code',
    };
  }
}
