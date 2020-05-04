import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
    // TODO: Add the mongo uri as a config variable
  imports: [
      MongooseModule.forRoot('mongodb://localhost/customer'),
      CustomerModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
