import mongoose, { Schema, Document, Model } from 'mongoose';
import { CustomerInterface, CustomerModel } from './customer';
import { DonutInterface, DonutModel } from './donut';
import { DroneInterface, DroneModel } from './drone';
import { LocationInterface, LocationModel } from './location';
import { StoreInterface, StoreModel } from './store';

export interface OrderInterface extends Document {
    customer: CustomerInterface,
    drone: DroneInterface,
    location: LocationInterface,
    store: StoreInterface,
    order_items: [DonutInterface]
    order_total: number
}

export const OrderSchema = new Schema({
    customer: {type: CustomerModel, required: true},
    drone: {type: DroneModel, required: true},
    location: {type: LocationModel, required: true},
    store: {type: StoreModel, required: true},
    order_items: {type: [DonutModel], required: true},
    order_price: {type: Number, required: true}
});

export const OrderModel: Model<OrderInterface> = mongoose.model('Order', OrderSchema);
