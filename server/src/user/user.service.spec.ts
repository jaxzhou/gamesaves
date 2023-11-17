import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../database/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.test.env'],
          isGlobal: true,
        }),
        DatabaseModule,
        MikroOrmModule.forFeature([
          User,
        ])
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
