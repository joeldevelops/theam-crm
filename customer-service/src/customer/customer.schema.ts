import { Schema } from 'mongoose';

export const customerSchema = new Schema({
    name: String,
    surname: String,
    photo: String,
    createdBy: String,
    companyId: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deleted: { type: Boolean, default: false }
});