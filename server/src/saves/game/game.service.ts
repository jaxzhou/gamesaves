import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Game } from '../../database/entities/game.entity';
import { Save } from '../../database/entities/save.entity';
import { User } from '../../database/entities/user.entity';
import { CreateSaveDto } from '../dto/create-save.dto';
import { CreateGameDto } from '../dto/create-game.dto';
import { Pagination } from '../../utils/pagination';
import { SaveInfoDto } from '../dto/save-info.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: EntityRepository<Game>,
    @InjectRepository(Save) private readonly saveRepo: EntityRepository<Save>) {}

  async createGame(game: CreateGameDto) {
    const createdGame = this.gameRepo.create(game);
    await this.gameRepo.getEntityManager().persistAndFlush(createdGame);
    return createdGame;
  }

  async findByName(name: string) {
    return this.gameRepo.findOne({ name });
  }

  async createGameSave(save: CreateSaveDto, user: User) {
    const { game, ...meta } = save;
    const gameEntity = await this.findByName(game);
    const createdSave = this.saveRepo.create(meta);
    createdSave.game.set(gameEntity);
    createdSave.user.set(user);
    await this.saveRepo.getEntityManager().persistAndFlush(createdSave);
    return createdSave;
  }

  async findUserSaves(user: User, page: number, pageSize: number): Promise<Pagination<SaveInfoDto>> {
    const [saves ,total] = await this.saveRepo.findAndCount({ user }, { populate: ['game', 'user'], limit: pageSize, offset: (page - 1) * pageSize });
    const data = saves.map(save => {
      return {
        id: save.id,
        filename: save.filename,
        update: save.update,
        game: save.game.getEntity(),
        user: save.user.getEntity(),
      }
    });
    return {
      total,
      page,
      pageSize,
      data,
    };
  }
  
  async findGameSaves(game: Game) {
    return this.saveRepo.find({ game }, { populate: ['game', 'user'] });
  }
}
