import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CustomerService } from './customer.service';

import mockCustomerModel from '../../test/mocks/customer-model.mock';

const companyId = 'companyId';
const customerId = 'customerId';
const updatedBy = 'updatedBy';

// NOTE: There is no way to access the model being called,
// so there is currently no way of checking the number of times a method was called.

describe('CustomerService', () => {
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getModelToken('Customer'),
          useValue: mockCustomerModel
        }
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('getCustomers', () => {
    it('should call the model to get all customers', () => {
      const result = customerService.getCustomers(companyId);

      expect(result).toBeTruthy();
    });
  });

  describe('getCustomerById', () => {
    it('should call the model to get a Customer by ID', () => {
      const result = customerService.getCustomerById(customerId, companyId);

      expect(result).toBeTruthy();
    });
  });

  describe('createCustomer', () => {
    const newCustomer = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista'
    };

    it('should call the model to save a new Customer doc', () => {
      const result = customerService.createCustomer(newCustomer as any);

      expect(result).toBeTruthy();
    });
  });

  describe('updateCustomer', () => {
    const updates = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista'
    };

    it('should call the model to update a single Customer doc', () => {
      const result = customerService.updateCustomer(customerId, companyId, updates as any);

      expect(result).toBeTruthy();
    });
  });

  describe('deleteCustomer', () => {
    it('should call the model to soft delete a Customer doc', () => {
      const result = customerService.deleteCustomer(customerId, updatedBy);

      expect(result).toBeTruthy();
    });
  });
});
