import mongoose, { Schema, Document, Model } from 'mongoose';
import { CustomerInterface, CustomerSchema } from './customer';
import { DonutInterface, DonutSchema } from './donut';
import { DroneInterface, DroneSchema } from './drone';
import { LocationInterface, LocationSchema } from './location';
import { StoreInterface, StoreSchema } from './store';

export interface OrderInterface extends Document {
    customer: CustomerInterface,
    drone: DroneInterface,
    location: LocationInterface,
    store: StoreInterface,
    items: [DonutInterface],
    total: number,
    status: string,
    start_time: Date,
    end_time: Date
}

export const OrderSchema = new Schema({
    customer: { type: mongoose.Schema.Types.ObjectId,
        ref: "CustomerSchema"
    },
    drone: {type: DroneSchema, required: true},
    location: {type: LocationSchema, required: true},
    store: {type: StoreSchema},
    items: {type: [DonutSchema], required: true},
    price: {type: Number, required: true},
    status: {type: String, enum: ["Accepted", "Preparing", "Delivering", "Delivered", "Canceled"], required: true},
    start_time: {type: Date, default: Date.now},
    end_time: {type: Date}
});

export const OrderModel: Model<OrderInterface> = mongoose.model('Order', OrderSchema);
