import { FlushMode, MikroORMOptions } from "@mikro-orm/core";
import { User } from "./src/database/entities/user.entity";
import * as dotenv from 'dotenv';
import { Game } from "./src/database/entities/game.entity";
import { Save } from "./src/database/entities/save.entity";

dotenv.config({
  path: `.${process.env.ENV||process.env.NODE_ENV}.env`,
});

const mikriOrmConfig: Partial<MikroORMOptions> = {
  type: 'postgresql',
  dbName: process.env.DATABASE_DBNAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Game, Save],
  ensureDatabase: true,
  debug: process.env.ENV != 'production',
  allowGlobalContext: true,
  flushMode: FlushMode.AUTO,
}
export default mikriOrmConfig;