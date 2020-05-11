import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

import mockCustomerModel from '../../test/mocks/customer-model.mock';

const companyId = "companyId1";
const customer1: any = {};
customer1.id = "id1";
customer1.companyId = companyId;
const customer2: any = {};
customer1.id = "id2";
customer1.companyId = companyId;

const request = {
  user: {
    userId: 'userId'
  }
}

describe('Customer Controller', () => {
  let customerService: CustomerService;
  let customerController: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: getModelToken('Customer'),
          useValue: mockCustomerModel
        }
      ]
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerController = module.get<CustomerController>(CustomerController);
  });

  describe('getCustomers', () => {
    it('should return an array of customers', async () => {
      const customers = [customer1, customer2];
      jest
        .spyOn(customerService, 'getCustomers')
        .mockImplementationOnce(() => Promise.resolve(customers));

      const result = await customerController.getCustomers(companyId);

      expect(result).toBeInstanceOf(Array);
      expect(result[0].companyId).toEqual(companyId);
    });
  });

  describe('getCustomerById', () => {
    it('should return a single customer with a matching ID', async () => {
      jest
        .spyOn(customerService, 'getCustomerById')
        .mockImplementationOnce(() => Promise.resolve(customer1));

      const result = await customerController.getCustomerById(customer1.id, companyId);

      expect(result.id).toEqual(customer1.id);
      expect(result.companyId).toEqual(companyId);
    });
  });

  describe('createCustomer', () => {
    const newCustomer = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista',
      role: 'ADMIN'
    }

    it('should create a single customer and return a boolean', async () => {
      jest
        .spyOn(customerService, 'createCustomer')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await customerController.createCustomer(request, newCustomer as any);

      expect(result).toBeTruthy();
    });
  });

  describe('updateCustomer', () => {
    const updates = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista'
    }

    it('should update a single customer and return a boolean', async () => {
      jest
        .spyOn(customerService, 'updateCustomer')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await customerController.updateCustomer(customer1.id, request, updates as any);

      expect(result).toBeTruthy();
    });
  });

  describe('deleteCustomer', () => {
    it('should update a single customer and return a boolean', async () => {
      jest
        .spyOn(customerService, 'deleteCustomer')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await customerController.deleteCustomer(customer1.id, request);

      expect(result).toBeTruthy();
    });
  });
});
