import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (config.docsEnabled) {
    const options = new DocumentBuilder()
    .setTitle('Photo Service')
    .setDescription('A service for managing photo uploads')
    .setVersion('1.0')
    .addTag('photo')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.docsEndpoint, app, document);
  }

  await app.listen(config.port);
}
bootstrap();
