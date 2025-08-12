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
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { getUserDto } from './dto/getUserDto.dto';
import { CreateUserDto } from './dto/createUserDto.dto';
import { SafeUser } from 'src/shared/types/safe-user';
import { updateUserDto } from './dto/updateUserDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  async getUser(@Body(new ValidationPipe()) param: getUserDto): Promise<any> {
    try {
      const user = await this.userService.getUser(param);
      if (!user) {
        throw new NotFoundException(
          `User with CPF: ${param.CPF} dos not exist`,
        );
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('error when searching for user');
    }
  }

  @Post('/singUp')
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
        email: created.email,
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

  @Delete('/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
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
}
