import { Document } from 'mongoose';

export class User extends Document {
  id: string;
  name: string;
  surname: string;
  permissions: Permissions;
  companyId: string; // The company that this user belongs to
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
}

export class UserInput {
  name: string;
  surname: string;
  permissions: Permissions;
}

export class UserUpdates {
  name: string;
  surname: string;
  permissions: Permissions;
  companyId: string; // The company that this user belongs to
  updatedAt: Date;
}

export enum Permissions {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SERVICE = 'SERVICE'
}