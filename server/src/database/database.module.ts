import { DynamicModule, Module, Type } from '@nestjs/common';
import { Orm } from './orm/orm';

@Module({
  providers: [Orm.createOrmFactory()],
  exports: [Orm],
})
export class DatabaseModule implements DynamicModule {
  module: Type<any>;
}
