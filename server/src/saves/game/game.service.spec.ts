import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Save } from '../../database/entities/save.entity';
import { Game } from '../../database/entities/game.entity';

describe('GameService', () => {
  let service: GameService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.test.env'],
          isGlobal: true,
        }),
        DatabaseModule,
        MikroOrmModule.forFeature([
          Save,
          Game,
        ]),
      ],
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createGame should return a game', async () => {
    const game = await service.createGame({name: 'test'});
    expect(game).toBeDefined();
    expect(game.name).toBe('test');
  });
});
