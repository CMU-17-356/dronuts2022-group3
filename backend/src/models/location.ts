import mongoose, { Schema, Document, Model } from 'mongoose';

// TODO (ananya) : create the actual model/interface

export interface LocationInterface extends Document {}

export const LocationSchema = new Schema({});

export const LocationModel: Model<LocationInterface> = mongoose.model('Location', LocationSchema);
