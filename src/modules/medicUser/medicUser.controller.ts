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
import { UserService } from './medicUser.service';
import { getUserDto } from "./dto/getMedicUser.dto";
import { SafeUser } from 'src/shared/types/safe-user';
import { AuthGuard } from '../auth/auth.guard';


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
}
