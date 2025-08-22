import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto.dto';
import { updateUserDto } from './dto/updateUserDto.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(params: { CPF: string; password: string }) {
    console.log(params);
    try {
      const user = await this.prisma.user.findFirst({
        where: { CPF: params.CPF },
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
      console.log(userWithoutPassword);
      return userWithoutPassword;
    } catch (error) {
      throw new Error('error searching for user - ' + error.message);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(user.password, 10);
      const createdUser = await this.prisma.user.create({
        data: { ...user, password: hashPassword },
      });
      return createdUser;
    } catch (error) {
      throw new Error('Error creating user - ' + error.message);
    }
  }

  async updateUser(params: { where: any; data: updateUserDto }) {
    const { where, data } = params;
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      return await this.prisma.user.update({
        where,
        data,
      });
    } catch (error) {
      throw new Error('Error updating user - ' + error.message);
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
