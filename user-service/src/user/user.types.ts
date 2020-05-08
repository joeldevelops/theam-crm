import { Document } from 'mongoose';

export class User extends Document {
  id: string;
  name: string;
  surname: string;
  role: Role;
  companyId: string; // The company that this user belongs to
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
}

export class UserInput {
  name: string;
  surname: string;
  companyId: string;
  role: Role;
}

export class UserUpdates {
  name: string;
  surname: string;
  companyId: string; // The company that this user belongs to
  updatedAt: Date;
}

export class UserRoleUpdates {
  role: Role;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SERVICE = 'SERVICE',
  ANY = 'ANY'
}