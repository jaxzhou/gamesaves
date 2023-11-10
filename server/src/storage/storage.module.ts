import { Module } from '@nestjs/common';
import { MinioService } from './minio/minio.service';
import { StorageController } from './storage.controller';

@Module({
  providers: [MinioService],
  controllers: [StorageController],
})
export class StorageModule {}
