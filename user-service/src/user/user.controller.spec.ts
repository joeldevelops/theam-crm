import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import mockUserModel from '../../test/mocks/user-model.mock';

const companyId = "companyId1";
const user1: any = {};
user1.id = "id1";
user1.companyId = companyId;
const user2: any = {};
user2.id = "id2";
user2.companyId = companyId;

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel
        }
      ]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [user1, user2];
      jest
        .spyOn(userService, 'getUsers')
        .mockImplementationOnce(() => Promise.resolve(users));

      const result = await userController.getUsers(companyId);

      expect(result).toBeInstanceOf(Array);
      expect(result[0].companyId).toEqual(companyId);
    });
  });

  describe('getUserById', () => {
    it('should return a single user with a matching ID', async () => {
      jest
        .spyOn(userService, 'getUserById')
        .mockImplementationOnce(() => Promise.resolve(user1));

      const result = await userController.getUserById(user1.id, companyId);

      expect(result.id).toEqual(user1.id);
      expect(result.companyId).toEqual(companyId);
    });
  });

  describe('createUser', () => {
    const newUser = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista',
      role: 'ADMIN'
    }

    it('should create a single user and return a boolean', async () => {
      jest
        .spyOn(userService, 'createUser')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await userController.createUser(newUser as any);

      expect(result).toBeTruthy();
    });
  });

  describe('updateUser', () => {
    const updates = {
      name: 'Paulo',
      surname: 'Coelho',
      companyId: 'ElAlquimista'
    }

    it('should update a single user and return a boolean', async () => {
      jest
        .spyOn(userService, 'updateUser')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await userController.updateUser(user1.id, updates as any);

      expect(result).toBeTruthy();
    });
  });

  describe('deleteUser', () => {
    it('should update a single user and return a boolean', async () => {
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await userController.deleteUser(user1.id);

      expect(result).toBeTruthy();
    });
  });

  describe('updateUserRole', () => {
    const updates = {
      role: 'ADMIN'
    };

    it('should update a single user and return a boolean', async () => {
      jest
        .spyOn(userService, 'updateUserPermissions')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await userController.updateUserRole(user1.id, updates as any);

      expect(result).toBeTruthy();
    });
  });
});
