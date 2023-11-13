import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from '@mikro-orm/nestjs';

async function bootstrap() {
  logger.log(`Starting application...`);
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("GameSaves")
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  logger.log(`Application started on http://localhost:3000`);
}
bootstrap();
