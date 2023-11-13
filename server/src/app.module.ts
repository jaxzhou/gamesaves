import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.ENV}.env`, '.env'],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
