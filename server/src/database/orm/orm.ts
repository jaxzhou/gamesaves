import { MikroORM } from '@mikro-orm/postgresql';
import { FactoryProvider, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';

@Injectable()
export class Orm extends MikroORM {
  public static createOrmFactory(): FactoryProvider<Orm> {
    return {
      provide: Orm,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const mikro = await MikroORM.init({
          dbName: config.get('DATABASE_DBNAME'),
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          user: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD'),
          entities: [User],
        });
        return mikro;
      },
    };
  }
}
