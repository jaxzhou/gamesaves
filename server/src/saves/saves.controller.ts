import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/auth/auth.guard';
import { GameService } from './game/game.service';
import { AuthUser } from '../user/user.decorator';
import { UserInfoDto } from '../user/dto/user-info.dto';
import { User } from '../database/entities/user.entity';

@Controller('saves')
@ApiTags("Storage")
@UseGuards(AuthGuard)
export class SavesController {
  constructor(private readonly gameService: GameService) {}

  // list user game saves
  // GET /saves
  @Get()
  async listUserGameSaves(@AuthUser() user: User) {
    return this.gameService.findUserSaves(user);
  }
}
