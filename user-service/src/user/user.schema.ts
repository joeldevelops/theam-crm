import { Schema } from 'mongoose';

export const userSchema = new Schema({
    name: String,
    surname: String,
    permissions: { type: String, default: 'USER' },
    companyId: String,
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deleted: { type: Boolean, default: false }
});