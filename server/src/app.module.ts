import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
