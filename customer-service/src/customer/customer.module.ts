import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { CustomerController } from './customer.controller';
import { customerSchema } from './customer.schema';
import { CustomerService } from './customer.service';
import { JwtStrategy } from './jwt.strategy';

import config from '../config/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: customerSchema }]),
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret
    })
  ],
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy]
})
export class CustomerModule {}
