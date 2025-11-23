import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/createAuthDto.dto';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req: any) {
    const userId = req.user.sub;
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        phone: true,
        CPF: true,
        created_at: true,
        address: true,
        age: true,
        blood: true,
        email: true,
        height: true,
        weight: true,
        IMC: true,
        plan: true,
        phoneHelp: true,
        registration: true,
      },
    });
  }
}
