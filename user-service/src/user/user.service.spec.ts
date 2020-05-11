import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserService } from './user.service';
import mockUserModel from '../../test/mocks/user-model.mock';

// NOTE: There is no way to access the model being called,
// so there is currently no way of checking the number of times a db method was called.

const companyId = 'companyId';
const userId = 'userId';

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

  describe('getUserById', () => {
    it('should call the model to get a user by ID', () => {
      const result = userService.getUserById(userId, companyId);

      expect(result).toBeTruthy();
    });
  });

  describe('createUser', () => {
    const newUser = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista',
      role: 'ADMIN'
    };

    it('should call the model to save a new user doc', () => {
      const result = userService.createUser(newUser as any);

      expect(result).toBeTruthy();
    });
  });

  describe('updateUser', () => {
    const updates = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista'
    };

    it('should call the model to update a single user doc', () => {
      const result = userService.updateUser(userId, companyId, updates as any);

      expect(result).toBeTruthy();
    });
  });

  describe('deleteUser', () => {
    it('should call the model to soft delete a user doc', () => {
      const result = userService.deleteUser(userId);

      expect(result).toBeTruthy();
    });
  });

  describe('updateUserPermissions', () => {
    const updates = {
      role: 'ADMIN'
    }

    it('should call the model to update a users permissions', () => {
      const result = userService.updateUserPermissions(userId, updates as any);

      expect(result).toBeTruthy();
    });
  });
});
