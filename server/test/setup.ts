import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

export default async () => {
  
  const orm = await MikroORM.init(config);
  const generator = orm.getSchemaGenerator();
  await generator.refreshDatabase();
  await orm.close(true);
}