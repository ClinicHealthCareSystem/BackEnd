import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { getUserDto } from './dto/getUserDto.dto';
import { CreateUserDto } from './dto/createUserDto.dto';
import { SafeUser } from 'src/shared/types/safe-user';
import { updateUserDto } from './dto/updateUserDto.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdatePasswordDto } from './dto/updatePasswordDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signIn')
  async getUser(@Body(new ValidationPipe()) param: getUserDto): Promise<any> {
    try {
      const user = await this.userService.login(param);
      console.log(user);
      if (!user) {
        throw new NotFoundException(`incorrect credentials`);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('error when searching for user');
    }
  }

  @Post('/signUp')
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: SafeUser }> {
    try {
      const created = await this.userService.createUser(createUserDto);
      if (!created) {
        throw new Error(`could not create user`);
      }

      let user = {
        id: created.id,
        name: created.name,
        phone: created.phone,
      };

      return {
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Patch('/updateUser')
  async updateUser(
    @Body(new ValidationPipe()) updateUserDto: updateUserDto,
  ): Promise<{ message: string }> {
    try {
      const userUpdated = await this.userService.updateUser({
        where: { CPF: updateUserDto.CPF },
        data: updateUserDto,
      });

      if (!userUpdated) {
        throw new NotFoundException('user has not been updated');
      }

      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const userDeleted = await this.userService.deleteUser({ id });
      if (!userDeleted) {
        throw new NotFoundException();
      }
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  @Patch('/updatePassword')
  async updatePassword(
    @Body(new ValidationPipe()) updatePassword: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    try {
      const userUpdated = await this.userService.updatePassword({
        where: { CPF: updatePassword.CPF },
        data: updatePassword,
      });

      if (!userUpdated) {
        throw new NotFoundException('user has not been updated');
      }

      return {
        message: 'User Password updated successfully',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update password user');
    }
  }
}
