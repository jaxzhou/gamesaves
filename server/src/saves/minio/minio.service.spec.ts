import { Test, TestingModule } from '@nestjs/testing';
import { MinioService } from './minio.service';
import { ConfigModule } from '@nestjs/config';
import { async } from 'rxjs';

describe('MinioService', () => {
  let service: MinioService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.test.env'],
          isGlobal: true,
        }),
      ],
      providers: [MinioService],
    }).compile();

    service = module.get<MinioService>(MinioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ensure bucket', async () => {
    await service.ensureBucket('test');
  });
});
