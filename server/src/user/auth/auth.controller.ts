import { Body, Controller, Post } from '@nestjs/common';
import { RegisteUserDto } from '../dto/registe-user.dto';
import { LoginUserDto } from '../dto/login-user.dtp';
import { UserService } from '../user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  async register(@Body() registerInfo: RegisteUserDto) {
    if (registerInfo.password !== registerInfo.passwordRepeat) {
      throw new Error("两次输入的密码不一致");
    }
    registerInfo.password = await this.userService.hashPassword(registerInfo.password);
    return this.userService.create({
      username: registerInfo.username,
      password: registerInfo.password,
      phone: registerInfo.phone,
    });
  }

  @Post("/login")
  async login(@Body() loginInfo: LoginUserDto) {
    const user = await this.userService.findByName(loginInfo.username);
    if (!user) {
      throw new Error("用户名不存在");
    }
    const password = await this.userService.hashPassword(loginInfo.password);
    if (password !== user.password) {
      throw new Error("密码错误");
    }
    return user;
  }

}
