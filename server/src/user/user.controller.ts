import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from './user.decorator';
import { User } from '../database/entities/user.entity';

@Controller('user')
@UseGuards(AuthGuard)
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAuthUser(@AuthUser() user: User) {
    return this.userService.findOne(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

}
