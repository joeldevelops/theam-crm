import { Schema } from 'mongoose';

export const userSchema = new Schema({
    name: String,
    surname: String,
    role: { type: String, default: 'USER' },
    companyId: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true }
});

// Transform the data when returning it to the client
userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.active;
  }
});