import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from '../user.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../database/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../database/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
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
          User
        ]),
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [UserService, AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  it('register', async () => {
    const createUserFunc = jest.spyOn(service, 'create');
    const user = await controller.register({
      username: 'test',
      phone: '123456789',
      password: '123456',
      passwordRepeat: '123456',
    });
    expect(createUserFunc).toHaveBeenCalledWith({
      username: 'test',
      phone: '123456789',
      password: 'ea48576f30be1669971699c09ad05c94',
    });
    expect(user).toHaveProperty('access_token');
  });
  
  it('login', async () => {
    const findFunc = jest.spyOn(service, 'findByName');
    const user = await controller.login({
      username: 'test',
      password: '123456',
    });
    expect(findFunc).toHaveBeenCalledWith('test');
    expect(user).toHaveProperty('access_token');
  });
});
