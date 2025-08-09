import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUser')
  async getUser(): Promise<any> {
    const user = await this.userService.getUser();
    return user;
  }

  @Post('/createUser')
  async createUser(@Body() params): Promise<string> {
    const user = await this.userService.createUser(params);
    return 'User created successfully';
  }

  @Post('/updateUser')
  async updateUser(@Body() params) {
    const user = await this.userService.updateUser(params);
    return 'User updated successfully';
  }

  @Delete('/deleteUser')
  async deleteUser(@Body() params) {
    const user = await this.userService.deleteUser(params);
    return 'User deleted successfully';
  }
}
