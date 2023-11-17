import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlushMode } from '@mikro-orm/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => ({
        type: 'postgresql',
        dbName: config.get('DATABASE_DBNAME') || 'saves',
        host: config.get('DATABASE_HOST') || 'localhost',
        port: parseInt(config.get('DATABASE_PORT') || '5432'),
        user: config.get('DATABASE_USER') || 'postgres',
        password: config.get('DATABASE_PASSWORD') || 'postgres',
        entities: ['dist/database/entities/*.entity.js'],
        entitiesTs: ['src/database/entities/*.entity.ts'],
        ensureDatabase: true,
        debug: process.env.NODE_ENV != 'production',
        autoLoadEntities: process.env.NODE_ENV != 'test',
        allowGlobalContext: true,
        flushMode: FlushMode.AUTO,
      }),
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
