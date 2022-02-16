import mongoose, { Schema, Document, Model } from 'mongoose';
import { CustomerInterface, CustomerSchema } from './customer';
import { DonutInterface, DonutSchema } from './donut';
import { DroneInterface, DroneSchema } from './drone';
import { LocationInterface, LocationSchema } from './location';
import { StoreInterface, StoreSchema } from './store';
import { OrderInterface, OrderSchema } from './order';

export interface PaymentInterface extends Document {
    payment_id: number,
    order_total: number,
    tax: number,
    service_fee: number,
    tip: number,
    order: OrderInterface,
    customer: CustomerInterface,
    completion_status: boolean
}

export const PaymentSchema = new Schema({
    payment_id: {type: Number, required: true},
    order_total: {type: Number, required: true},
    tax: {type: Number, required: true},
    service_fee: {type: Number, required: true},
    tip: {type: Number, required: true},
    order: {type: OrderSchema, required: true},
    customer: {type: CustomerSchema, required: true},
    completion_status: {type: Boolean, required: true}
});

export const PaymentModel: Model<PaymentInterface> = mongoose.model('Payment', PaymentSchema);