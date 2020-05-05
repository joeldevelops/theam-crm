import { Schema } from 'mongoose';

export const customerSchema = new Schema({
    name: String,
    surname: String,
    photo: String,
    companyId: String,
    createdBy: String,
    updatedBy: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true }
});

// Transform the data when returning it to the client
customerSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.active;
  }
});