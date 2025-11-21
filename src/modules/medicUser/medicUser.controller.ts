import {
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MedicService } from './medicUser.service';
import { getMedicDto } from './dto/getMedicUser.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('medic')
export class UserController {
  constructor(private readonly medicService: MedicService) {}

  @Post('/signIn')
  async getUser(@Body(new ValidationPipe()) param: getMedicDto): Promise<any> {
    try {
      const user = await this.medicService.login(param);
      if (!user) {
        throw new NotFoundException(`incorrect credentials`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('error when searching for user');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<{ message: string }> {
    try {
      const userDeleted = await this.medicService.deleteUser({ id });
      if (!userDeleted) {
        throw new NotFoundException();
      }
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
