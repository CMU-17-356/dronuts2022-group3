import mongoose, { Schema, Document, Model } from 'mongoose';
// const { Schema } = mongoose;

export interface CustomerInterface extends Document {
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string
}

const customerSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: String,
  email: String,
  phone_number: String,
  password: String
//   addresses: []
});

export const CustomerModel: Model<CustomerInterface> = mongoose.model('Customer', customerSchema);
