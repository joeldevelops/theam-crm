import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './customer/customer.module';

import config from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.connectionString),
    CustomerModule
  ],
})
export class AppModule {}
