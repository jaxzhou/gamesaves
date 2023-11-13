import { Body, Controller, Post } from '@nestjs/common';
import { RegisteUserDto } from '../dto/registe-user.dto';
import { LoginUserDto } from '../dto/login-user.dtp';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerInfo: RegisteUserDto) {
    if (registerInfo.password !== registerInfo.passwordRepeat) {
      throw new Error("两次输入的密码不一致");
    }
    return this.authService.register(registerInfo);
  }

  @Post("/login")
  async login(@Body() loginInfo: LoginUserDto) {
    const auth = await this.authService.login(loginInfo);
    return auth;
  }

}
