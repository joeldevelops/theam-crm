import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './customer.controller';
import { customerSchema } from './customer.schema';
import { CustomerService } from './customer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: customerSchema }])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
