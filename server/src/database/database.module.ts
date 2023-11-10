import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';

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
        autoLoadEntities: true,
      }),
    }),
    MikroOrmModule.forFeature([
      User,
    ])
  ],
  exports: [],
})
export class DatabaseModule {}
