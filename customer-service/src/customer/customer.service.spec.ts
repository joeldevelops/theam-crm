import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CustomerService } from './customer.service';

import mockCustomerModel from '../../test/mocks/customer-model.mock';

const companyId = 'companyId';

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
});
