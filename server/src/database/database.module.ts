import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { FlushMode } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgresql',
        dbName: config.get('DATABASE_DBNAME'),
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        user: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        entities: ['dist/database/entities/*.entity.js'],
        entitiesTs: ['src/database/entities/*.entity.ts'],
        ensureDatabase: true,
        debug: process.env.ENV != 'production',
        autoLoadEntities: false,
        allowGlobalContext: true,
        flushMode: FlushMode.AUTO,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
