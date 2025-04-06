import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './createUser.dto';
import { User } from './user.entity';
import CreateInvitationDto from './createInvitation.dto';
import UserInvitation from './userInvitation.entity';
import UserUiDataInterface from './interfaces/UserUiData.interface';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('invite')
  async validateInvite(@Query('token') token: string) {
    return this.userService.validateInvitation(token);
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return await this.userService.create(userDto);
  }

  @Get(':id')
  async findUser(@Param('id') idUser: number): Promise<User> {
    return await this.userService.findUserById(idUser);
  }

  @Get()
  async getUserDataByEmail(@Query('email') email: string): Promise<UserUiDataInterface> {
    return await this.userService.findFullDataByEmail(email);
  }

  @Post('invitation')
  async createUserInvitation(
    @Body() body: CreateInvitationDto,
  ): Promise<UserInvitation> {
    return await this.userService.createInvitation(body);
  }
}
