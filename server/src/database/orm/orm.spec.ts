import { Test, TestingModule } from '@nestjs/testing';
import { Orm } from './orm';
import { ConfigModule } from '@nestjs/config';

describe('Orm', () => {
  let provider: Orm;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.test.env'],
        }),
      ],
      providers: [Orm.createOrmFactory()],
    }).compile();

    provider = module.get<Orm>(Orm);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
