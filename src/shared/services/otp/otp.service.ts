import { Injectable } from '@nestjs/common';

@Injectable()
export class OTPService {
  generateOTP(): string {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += numbers[Math.floor(Math.random() * numbers.length)];
    }
    console.log(otp);
    return otp;
  }
}
