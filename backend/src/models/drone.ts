<<<<<<< HEAD
<<<<<<< HEAD
=======
import mongoose, { Schema, Document, Model } from 'mongoose';

// TODO (Funmbi) : create the actual model/interface

export interface DroneInterface extends Document {}

export const DroneSchema = new Schema({});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);
=======
>>>>>>> master

import mongoose, { Schema, Document, Model } from 'mongoose';
import { LocationInterface, LocationModel } from './location';
import { OrderInterface, OrderModel } from './order';


export interface DroneInterface extends Document {
    battery_life: number,
    drone_location: LocationInterface,
    drone_orderId: OrderInterface,
    critical: boolean
}

export const DroneSchema = new Schema({
    battery_life: {type: Number, required: true},
    drone_location: {type: LocationModel, required: true},
    drone_orderId: {type: OrderModel, required: true},
    critical: {type: Boolean, required: true},
});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);
<<<<<<< HEAD
=======
import mongoose, { Schema, Document, Model } from 'mongoose';

// TODO (Funmbi) : create the actual model/interface

export interface DroneInterface extends Document {}

export const DroneSchema = new Schema({});

export const DroneModel: Model<DroneInterface> = mongoose.model('Drone', DroneSchema);
>>>>>>> master
=======
>>>>>>> funmbi
>>>>>>> master
