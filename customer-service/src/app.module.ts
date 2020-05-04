import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './customer/customer.module';

@Module({
    // TODO: Add the mongo uri as a config variable
  imports: [
    MongooseModule.forRoot('mongodb://localhost/customer'),
    CustomerModule
  ]
})
export class AppModule {}
