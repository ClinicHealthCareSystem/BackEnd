import { Injectable } from '@nestjs/common';

interface OTPSchema {
  code: string;
  phone: string;
  expireIn: Date;
  attempts: number;
}

@Injectable()
export class OTPService {
  private readonly MINUTES_TO_EXPIRY = 1;
  private otpStore = new Map<string, OTPSchema>();
  private MAX_ATTEMPTS = 3;

  generateOTP(): string {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return otp;
  }

  async storeOTP(phone: string, code: string) {
    const expireIn = new Date();
    expireIn.setMinutes(expireIn.getMinutes() + this.MINUTES_TO_EXPIRY);

    this.otpStore.set(phone, {
      code,
      phone,
      expireIn,
      attempts: 0,
    });
  }

  async validateCode(phone: string, code: string) {
    const otpData = this.otpStore.get(phone);

    if (!otpData) {
      return { valid: false, message: 'Código não encontrado' };
    }

    if (new Date() > otpData.expireIn) {
      this.otpStore.delete(phone);
      return { valid: false, message: 'Código expirado' };
    }

    otpData.attempts++;

    if (otpData.attempts > this.MAX_ATTEMPTS) {
      this.otpStore.delete(phone);
      return { valid: false, message: 'Você passou do limite de tentativas' };
    }

    if (otpData.code !== code) {
      this.otpStore.set(phone, otpData);
      return { valid: false, message: 'Código inválido, tente novamente' };
    }

    this.otpStore.delete(phone);
    return { valid: true, message: 'Código válido' };
  }
}
