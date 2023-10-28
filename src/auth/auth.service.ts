import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JWTUser } from './interfaces/jwt-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await comparePassword(password, user.senha))) {
      return {
        _id: user._id,
        username: user.nome,
        email: user.email,
        role: user.role,
      };
    }
    throw new UnauthorizedException('Usuário(a) ou senha inválidos.');
  }

  async login(data: LoginDto) {
    const user = await this.validateUser(data.email, data.password);
    const payload: JWTUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
