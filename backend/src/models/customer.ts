import mongoose, { Schema, Document, Model } from 'mongoose';
// const { Schema } = mongoose;

export interface CustomerInterface extends Document {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string
}

const LocationSchema = new Schema({}); // TODO (ananya) : create the actual model and remove this

const CustomerSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: true},
  phone_number: {type: String, required: true},
  password: {type: String, required: true},
  addresses: [LocationSchema]
});

export const CustomerModel: Model<CustomerInterface> = mongoose.model('Customer', CustomerSchema);
