import mongoose, { Schema, Document, Model } from 'mongoose';

// TODO (Funmbi) : create the actual model/interface

export interface DroneInterface extends Document {}

export const DroneSchema = new Schema({});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);
