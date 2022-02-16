import mongoose, { Schema, Document, Model } from 'mongoose';
import { CustomerInterface, CustomerSchema } from './customer';
import { DonutInterface, DonutSchema } from './donut';
import { DroneInterface, DroneSchema } from './drone';
import { LocationInterface, LocationSchema } from './location';
import { StoreInterface, StoreSchema } from './store';
import { OrderInterface, OrderSchema } from './order';

export interface PaymentInterface extends Document {
    payment_id: int,
    order_total: float,
    tax: float,
    service_fee: float,
    tip: float,
    order: OrderInterface,
    customer: CustomerInterface,
    completion_status: bool
}

export const PaymentSchema = new Schema({
    payment_id: {type: int, required: true},
    order_total: {type: float, required: true},
    tax: {type: float, required: true},
    service_fee: {type: float, required: true},
    tip: {type: float, required: true},
    order: {type: OrderSchema, required: true}
    customer: {type: CustomerSchema, required: true}
    completion_status: {type: bool, required: true}
});

export const PaymentModel: Model<PaymentInterface> = mongoose.model('Payment', PaymentSchema);