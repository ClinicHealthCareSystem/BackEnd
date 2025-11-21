import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MedicService {
  constructor(private readonly prisma: PrismaService) {}

  async login(params: { email: string; password: string }) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: params.email },
        select: {
          id: true,
          name: true,
          password: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(
        params.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException("passwords don't match");
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new Error('error searching for user - ' + error.message);
    }
  }

  async deleteUser(params: { id: string }): Promise<boolean> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: params.id },
      });

      if (!user) {
        throw new Error(`User with id: ${params.id} does not exist`);
      }

      await this.prisma.user.update({
        where: { id: params.id },
        data: { deleted: true, active: false },
      });

      return true;
    } catch (error) {
      throw new Error('Error when deleting user - ' + error.message);
    }
  }
}
