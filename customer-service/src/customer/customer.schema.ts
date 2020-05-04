import { Schema } from 'mongoose';

export const customerSchema = new Schema({
    name: String,
    surname: String,
    photo: String,
    createdBy: String,
    companyId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
    deleted: { type: Boolean, default: false }
});