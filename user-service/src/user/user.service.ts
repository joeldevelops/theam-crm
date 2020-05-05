import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserInput, UserUpdates, UserPermissionUpdates } from './user.types';
import * as dbUtil from '../database/db.util';

@Injectable()
export class UserService {
  
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  public async getUsers(userId: string): Promise<User[]> {
    return this.userModel.find(dbUtil.query({userId})).exec();
  }

  public async getUserById(id: string, companyId: string): Promise<User> {
    return this.userModel.findOne(
      dbUtil.query({
        _id: new Types.ObjectId(id),
        companyId,
      })
    ).exec();
  }

  public async createUser(user: UserInput): Promise<boolean> {
    const newUser = new this.userModel(user);
    const result = await newUser.save();

    return dbUtil.checkResponse(
      result,
      'User creation failed'
    );
  }

  public async updateUser(
    id: string,
    companyId: string,
    userUpdates: UserUpdates
  ): Promise<boolean> {
    userUpdates.updatedAt = new Date();
    const result = await this.userModel.updateOne(
      dbUtil.query({ _id: new Types.ObjectId(id), companyId }),
      userUpdates
    );

    return dbUtil.checkResponse(
      result,
      `Update on user with ID: ${id} was unsuccessful`
    );
  }

  public async deleteUser(id: string): Promise<boolean> {
    const result = await this.userModel.updateOne(
      dbUtil.query({ _id: new Types.ObjectId(id) }),
      {
        updatedAt: new Date(),
        active: false
      }
    );

    return dbUtil.checkResponse(
      result,
      `Delete on user with ID: ${id} was unsuccessful`
    );
  }

  public async updateUserPermissions(
    id: string,
    body: UserPermissionUpdates
  ): Promise<boolean> {
    const result = await this.userModel.updateOne(
      dbUtil.query({ _id: new Types.ObjectId(id) }),
      {
        permissions: body.permissions
      }
    );

    return dbUtil.checkResponse(
      result,
      `Update on user permissions with ID: ${id} was unsuccessful`
    );
  }
}
