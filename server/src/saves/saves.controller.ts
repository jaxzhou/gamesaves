import { Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../user/auth/auth.guard';
import { GameService } from './game/game.service';
import { AuthUser } from '../user/user.decorator';
import { UserInfoDto } from '../user/dto/user-info.dto';
import { User } from '../database/entities/user.entity';
import { SaveInfoDto } from './dto/save-info.dto';
import { Pagination } from '../utils/pagination';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('saves')
@ApiTags("Storage")
@UseGuards(AuthGuard)
export class SavesController {
  constructor(private readonly gameService: GameService) {}

  // list user game saves
  // GET /saves
  @Get()
  async listUserGameSaves(
    @AuthUser() user: User,
    @Query("page") page: number,
    @Query("pageSize") pageSize: number): Promise<Pagination<SaveInfoDto>> {
      return this.gameService.findUserSaves(user, page, pageSize);
  }

  // Uploda game save file
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createGameSave(
    @AuthUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Query("game") game: string) {
      return this.gameService.createGameSave(
        { game, filename: file.filename, update: new Date() },
        user
      );
  }
}
