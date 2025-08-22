import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/createAuthDto.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(params: CreateAuthDto): Promise<{ access_token: string }> {
    const user = await this.usersService.login({
      CPF: params.CPF,
      password: params.password,
    });
    if (!user) throw new UnauthorizedException();
    const payload = { sub: user.id, username: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
