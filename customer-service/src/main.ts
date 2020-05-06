import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'customer_queue',
      queueOptions: {
        durable: true
      }
    }
  });

  if (config.docsEnabled) {
    const options = new DocumentBuilder()
    .setTitle('Customer Service')
    .setDescription('A service for managing customers')
    .setVersion('1.0')
    .addTag('customer')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.docsEndpoint, app, document);
  }

  await app.startAllMicroservicesAsync();
  await app.listen(config.port);
}
bootstrap();
