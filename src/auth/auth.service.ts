import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserService from '../user/user.service';
import { User } from '../user/user.entity';
import { PayloadToken } from './token.interface';
import { MailService } from '../mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...response } = user;

        return response;
      }
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async sendPasswordReset(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const token = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    const resetLink = `${process.env.APP_URL}reset-password?token=${token}`;

    this.logger.log(`[AuthService] sendPasswordReset: sending recovery password to ${email}`);

    await this.mailService.sendEmail({
      to: email,
      subject: 'Recupera tu contraseña',
      text: `<p>Haz clic para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
      url: '',
    });
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const user = await this.userService.findUserById(decoded.sub);

      if (!user) throw new Error('Usuario no encontrado');

      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
    } catch (err) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }


}
