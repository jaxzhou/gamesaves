import { Module } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { SavesController } from './saves.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Game } from '../database/entities/game.entity';
import { Save } from '../database/entities/save.entity';
import { GameService } from './game/game.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([
      Game,
      Save,
    ]),
    UserModule,
  ],
  providers: [MinioService, GameService],
  controllers: [SavesController],
})
export class StorageModule {}
