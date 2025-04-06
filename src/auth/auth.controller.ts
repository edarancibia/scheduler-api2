import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserService from '../user/user.service';
import LoginDto from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() req) {
    return this.authService.generateJwt(req);
  }

  @Post('recovery')
  async recovery(@Body() body: LoginDto) {
    return this.userService.passwordRecovery(body.email, body.password);
  }
}
