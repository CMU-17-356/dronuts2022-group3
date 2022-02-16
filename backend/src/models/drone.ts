
import mongoose, { Schema, Document, Model } from 'mongoose';
import { LocationInterface, LocationSchema } from './location';



export interface DroneInterface extends Document {
    battery_life: number,
    drone_location: LocationInterface,
    critical: boolean
}

export const DroneSchema = new Schema({
    battery_life: {type: Number, required: true},
    drone_location: {type: LocationSchema, required: true},
    critical: {type: Boolean, required: true},
});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);

