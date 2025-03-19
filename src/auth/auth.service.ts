import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import UserService from '../user/user.service';
import { User } from '../user/user.entity';
import { PayloadToken } from './token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch) {
        const { password, ...response } = user;

        return response;
      }
    }

    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id }
    console.log(this.jwtService.sign(payload))

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
