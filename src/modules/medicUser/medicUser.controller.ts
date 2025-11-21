import {
  Body,
  Controller,
  Delete,
  Get,
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
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Controller('medic')
export class MedicController {
  constructor(
    private readonly medicService: MedicService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('/profile')
  async getMedicProfile() {
    return this.prisma.medicUser.findFirst({
      select: {
        name: true,
        email: true,
        CRM: true,
        created_at: true,
        specialty: true,
      },
    });
  }

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
