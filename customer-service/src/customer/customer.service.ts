import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer, CustomerInput, CustomerUpdates } from './customer.types';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private customerModel: Model<Customer>) {}

  public async getCustomers(customerId: string): Promise<Customer[]> {
    return this.customerModel.find(this.query({customerId})).exec();
  }

  public async getCustomerById(id: string, companyId: string): Promise<Customer> {
    return this.customerModel.findOne(this.query({
      _id: id,
      companyId,
    }));
  }

  public async createCustomer(customer: CustomerInput): Promise<boolean> {
    const newCustomer = new this.customerModel(customer);
    const result = await newCustomer.save();

    return this.checkResponse(
      result,
      'Customer creation failed'
    );
  }

  public async updateCustomer(
    id: string,
    companyId: string,
    customerUpdates: CustomerUpdates
  ): Promise<boolean> {
    const result = await this.customerModel.updateOne(
      this.query({ _id: id, companyId }),
      customerUpdates
    );

    return this.checkResponse(
      result,
      `Update on customer with ID: ${id} was unsuccessful`
    );
  }

  public async deleteCustomer(id: string): Promise<boolean> {
    const result = await this.customerModel.updateOne(
      { _id: id },
      { deleted: true }
    );

    return this.checkResponse(
      result,
      `Delete on customer with ID: ${id} was unsuccessful`
    );
  }

  private checkResponse(result: any, message: string): boolean {
    if (!result) {
      console.log(message);
      return false;
    }

    return true;
  }

  private query(document: object): object {
    return {
      ...document,
      deleted: false
    }
  }
}
