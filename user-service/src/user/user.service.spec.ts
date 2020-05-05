import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserService } from './user.service';
import mockUserModel from '../../test/mocks/user-model.mock';

// NOTE: There is no way to access the model being called,
// so there is currently no way of checking the number of times a db method was called.

const companyId = 'companyId';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should call the model to get all users', () => {
      const result = userService.getUsers(companyId);

      expect(result).toBeTruthy();
    });
  });
});
