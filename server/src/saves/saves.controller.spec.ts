import { Test, TestingModule } from '@nestjs/testing';
import { SavesController } from './saves.controller';
import { AuthService } from '../user/auth/auth.service';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Save } from '../database/entities/save.entity';
import { Game } from '../database/entities/game.entity';
import { async } from 'rxjs';

describe('StorageController', () => {
  let controller: SavesController;
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
        UserModule,
      ],
      controllers: [SavesController],
    }).compile();

    controller = module.get<SavesController>(SavesController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
