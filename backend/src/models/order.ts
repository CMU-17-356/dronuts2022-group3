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
    order_items: [DonutInterface]
    order_total: number
}

export const OrderSchema = new Schema({
    customer: {type: CustomerSchema, required: true},
    drone: {type: DroneSchema, required: true},
    location: {type: LocationSchema, required: true},
    store: {type: StoreSchema, required: true},
    order_items: {type: [DonutSchema], required: true},
    order_price: {type: Number, required: true}
});

export const OrderModel: Model<OrderInterface> = mongoose.model('Order', OrderSchema);
