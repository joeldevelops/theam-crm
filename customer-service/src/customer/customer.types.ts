import { Document } from 'mongoose';

export class Customer extends Document {
  id: string;
  name: string;
  surname: string;
  photo: string; // Path to photo
  createdBy: string; // User ID
  updatedBy: string;
  companyId: string; // The company that this customer is in the CRM of
  createdAt: Date;
  updatedAt: Date;
  active?: boolean;
}

export class CustomerInput {
  name: string;
  surname: string;
  companyId: string;
  createdBy?: string;
}

export class CustomerUpdates {
  name?: string;
  surname?: string;
  photo?: string; // Path to photo
  updatedBy?: string; // User ID
  companyId?: string; // The company that this customer is in the CRM of
  updatedAt?: Date;
}