import { FlushMode } from "@mikro-orm/core";
import { User } from "./src/database/entities/user.entity";
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.${process.env.ENV}.env`,
});

export default {
  type: 'postgresql',
  dbName: process.env.DATABASE_DBNAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [User],
  ensureDatabase: true,
  debug: process.env.ENV != 'production',
  autoLoadEntities: false,
  allowGlobalContext: true,
  flushMode: FlushMode.AUTO,
}