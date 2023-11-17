import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('root', () => {
    it('should return Version Info', () => {
      expect(appController.getVersion()).toBe('GameSaves 0.0.1');
    });
  });
});
