import mongoose, { Schema, Document, Model } from 'mongoose';

import { LocationSchema, LocationInterface } from './location';

export interface StoreInterface extends Document {
  name: string,
  email: string,
  phone_number: string,
  address: LocationInterface
}

const StoreSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone_number: {type: String, required: true},
  address: {type: LocationSchema, required: true},
});

export const StoreModel: Model<StoreInterface> = mongoose.model('Store', StoreSchema);

