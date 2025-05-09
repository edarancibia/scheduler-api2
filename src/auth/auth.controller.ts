import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserService from '../user/user.service';
import LoginDto from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('/login')
  async login(@Body() req) {
    return this.authService.generateJwt(req);
  }

  @Post('recovery')
  async recovery(@Body() body: LoginDto) {
    return this.userService.passwordRecovery(body.email, body.password);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    await this.authService.resetPassword(body.token, body.newPassword);
    return { message: 'Contraseña actualizada correctamente.' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.sendPasswordReset(email);
    return { message: 'Recibirás un enlace para restablecer tu contraseña.' };
  }
}
