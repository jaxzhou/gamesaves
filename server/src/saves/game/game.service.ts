import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Game } from '../../database/entities/game.entity';
import { Save } from '../../database/entities/save.entity';
import { User } from '../../database/entities/user.entity';
import { CreateSaveDto } from '../dto/create-save.dto';
import { CreateGameDto } from '../dto/create-game.dto';

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

  async findUserSaves(user: User) {
    return this.saveRepo.find({ user }, { populate: ['game', 'user']  });
  }
  
  async findGameSaves(game: Game) {
    return this.saveRepo.find({ game }, { populate: ['game', 'user'] });
  }
}
