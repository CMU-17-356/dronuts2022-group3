
import mongoose, { Schema, Document, Model } from 'mongoose';
import { LocationInterface, LocationSchema } from './location';
import { OrderInterface, OrderSchema } from './order';


export interface DroneInterface extends Document {
    battery_life: number,
    drone_location: LocationInterface,
    drone_order: OrderInterface,
    critical: boolean
}

export const DroneSchema = new Schema({
    battery_life: {type: Number, required: true},
    drone_location: {type: LocationSchema, required: true},
    drone_order: {type: OrderSchema, required: true},
    critical: {type: Boolean, required: true},
});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);
