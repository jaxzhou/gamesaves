import { MikroORM } from "@mikro-orm/postgresql";
import config from 'mikro-orm.config';

(async () => {
  const orm = await MikroORM.init({
    dbName: config.dbName,
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    entities: config.entities,
    ensureDatabase: true,
    ensureIndexes: true,
  });
  const migrator = orm.getMigrator();
  migrator.createInitialMigration();

})();