import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(): Promise<any> {
    return this.prisma.user.findFirst();
  }

  async createUser(params) {
    const user = await this.prisma.user.create({
      data: {
        CPF: params.CPF,
        password: params.password,
      },
    });
    return user;
  }

  async updateUser(params) {
    const user = await this.prisma.user.update({
      where: { id: params.id },
      data: {
        password: params.password,
      },
    });
    return user;
  }

  async deleteUser(params) {
    const user = await this.prisma.user.delete({
      where: { id: params.id },
    });
    return user;
  }
}