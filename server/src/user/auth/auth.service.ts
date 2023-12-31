import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserService } from '../user.service';
import { LoginUserDto } from '../dto/login-user.dtp';
import { User } from '../../database/entities/user.entity';
import { RegisteUserDto } from '../dto/registe-user.dto';
import { UserInfoDto } from '../dto/user-info.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {
  }

  async validateUser(user: LoginUserDto): Promise<UserInfoDto> {
    const userEntiry = await this.userService.findByName(user.username);
    if (!userEntiry) {
      return null;
    }
    const hashPassword = await this.hashPassword(user.password);
    if (userEntiry && userEntiry.password === hashPassword) {
      const { password, ...result } = userEntiry;
      return result;
    }
    return null;
  }

  async hashPassword(password: string) {
    const salt = '123456';
    const hash = crypto.createHash('md5').update(password + salt).digest('hex');
    return hash;
  }

  async login(user: LoginUserDto) {
    const payload = await this.validateUser(user);
    if (!payload) {
      throw new UnauthorizedException("用户名或密码错误");
    }
    return {
      access_token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
    };
  }

  async register(user: RegisteUserDto) {
    const userEntity = await this.userService.create({
      username: user.username,
      password: await this.hashPassword(user.password),
      phone: user.phone,
    });
    const { password, ...result } = userEntity;
    return {
      access_token: this.jwtService.sign(result, {secret: process.env.JWT_SECRET}),
    };
  }
}
