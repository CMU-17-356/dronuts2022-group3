import mongoose, { Schema, Document, Model } from 'mongoose';

import { LocationInterface, LocationSchema } from './location';

export interface EmployeeInterface extends Document {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
    addresses: [LocationInterface]
}

const EmployeeSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    addresses: [LocationSchema]
});

export const EmployeeModel: Model<EmployeeInterface> = mongoose.model('Employee', EmployeeSchema);