import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Customer, CustomerInput, CustomerUpdates } from './customer.types';
import * as dbUtil from '../database/db.util';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

  public async getCustomers(companyId: string): Promise<Customer[]> {
    return this.customerModel.find(
      dbUtil.query({companyId})
    ).exec();
  }

  public async getCustomerById(id: string, companyId: string): Promise<Customer> {
    return this.customerModel.findOne(
      dbUtil.query({
        _id: Types.ObjectId.createFromHexString(id),
        companyId
      })
    ).exec();
  }

  public async createCustomer(customer: CustomerInput): Promise<boolean> {
    const newCustomer = new this.customerModel(customer);
    const result = await newCustomer.save();

    return dbUtil.checkResponse(
      result,
      'Customer creation failed'
    );
  }

  public async updateCustomer(
    id: string,
    companyId: string,
    customerUpdates: CustomerUpdates
  ): Promise<boolean> {
    customerUpdates.updatedAt = new Date();
    const result = await this.customerModel.updateOne(
      dbUtil.query({ _id: new Types.ObjectId(id), companyId }),
      customerUpdates
    );

    return dbUtil.checkResponse(
      result,
      `Update on customer with ID: ${id} was unsuccessful`
    );
  }

  public async deleteCustomer(id: string): Promise<boolean> {
    const result = await this.customerModel.updateOne(
      dbUtil.query({ _id: new Types.ObjectId(id) }),
      {
        updatedAt: new Date(),
        active: false
      }
    );

    return dbUtil.checkResponse(
      result,
      `Delete on customer with ID: ${id} was unsuccessful`
    );
  }
}
