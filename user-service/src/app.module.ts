import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

import config from './config/config';

@Module({
  imports: [
    MongooseModule.forRoot(config.db.connectionString),
    UserModule
  ]
})
export class AppModule {}
