import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, UploadedObjectInfo } from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService {
  private client: Client;
  constructor(private configService:ConfigService) {
    this.client = new Client({
      endPoint: configService.get('MINIO_ENDPOINT'),
      port: configService.get('MINIO_PORT'),
      accessKey: configService.get('MINIO_ACCESS_KEY'),
      secretKey: configService.get('MINIO_SECRET_KEY'),
    });
  }

  public async ensureBucket(buketName: string): Promise<void> {
    const exists = await this.client.bucketExists(buketName);
    if (!exists) {
      await this.client.makeBucket(buketName);
    }
  }

  public async putObject(bucketName: string, objectName: string, objectStream: Readable): Promise<UploadedObjectInfo> {
    await this.ensureBucket(bucketName);
    return this.client.putObject(bucketName, objectName, objectStream);
  }

  public async getObject(bucketName: string, objectName: string): Promise<Readable> {
    return this.client.getObject(bucketName, objectName);
  }
}
