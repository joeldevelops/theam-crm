import { Document } from 'mongoose';

export class Customer extends Document {
  id: string;
  name: string;
  surname: string;
  photo: string; // Path to photo
  createdBy: string; // User ID
  companyId: string; // The company that this customer is in the CRM of
  createdAt: Date;
  updatedAt: Date;
  deleted?: boolean;
}

export class CustomerInput {
  name: string;
  surname: string;
}

export class CustomerUpdates {
  name: string;
  surname: string;
  photo: string; // Path to photo
  createdBy: string; // User ID
  companyId: string; // The company that this customer is in the CRM of
  updatedAt: Date;
}