import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto.dto';
import { updateUserDto } from './dto/updateUserDto.dto';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async login(params: { CPF: string; password: string }) {
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
      return userWithoutPassword;
    } catch (error) {
      throw new Error('error searching for user - ' + error.message);
    }
  }

  async createUser(user: CreateUserDto) {
    try {
      
      const year = new Date().getFullYear().toString();
      const random = Math.floor(100 + Math.random() * 900).toString();
      const lastTwoCpf = user.CPF.slice(-2);
      const registration = `${year}${random}${lastTwoCpf}`;

      const hashPassword = await bcrypt.hash(user.password, 10);

      const createdUser = await this.prisma.user.create({
        data: { ...user, password: hashPassword, registration: registration },
      });

      return createdUser;
    } catch (error) {
      throw new Error('Error creating user - ' + error.message);
    }
  }

  async updateUser(params: { where: any; data: updateUserDto }) {
    const { where, data } = params;
    try {
      const existingUser = await this.prisma.user.findFirst({ where });

      if (!existingUser) {
        throw new Error('User not found');
      }

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

  async updatePassword(params: { where: any; data: UpdatePasswordDto }) {
    const { where, data } = params;
    try {
      const existingUser = await this.prisma.user.findFirst({ where });

      if (!existingUser) {
        throw new Error('User not found');
      }

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

  async updateUserInfo(updatedUser: {
    cpf: string;
    email: string;
    phone: string;
    address: string;
    phoneHelp: string | null;
  }) {
    try {
      const { cpf, email, phone, address, phoneHelp } = updatedUser;
      const existingUser = await this.prisma.user.findFirst({
        where: {
          CPF: cpf,
        },
      });

      if (!existingUser) {
        throw new Error('User Not Found');
      }

      return await this.prisma.user.update({
        where: { CPF: cpf },
        data: {
          email,
          phone,
          address,
          ...(phoneHelp !== undefined && { phoneHelp }),
        },
      });
    } catch (error) {
      throw new Error('Error updating user - ' + error.message);
    }
  }

  async fetchAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          age: true,
          phone: true,
        },
      });

      if (!users) {
        throw new Error('error when fetching for users');
      }

      return users;
    } catch (error) {
      throw new Error('error when fetching for users - ' + error.message);
    }
  }
}
