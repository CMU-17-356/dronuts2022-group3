import mongoose, { Schema, Document, Model } from 'mongoose';

export interface DonutInterface extends Document {
    flavor: string,
    price: number
}

export const DonutSchema = new Schema({
    flavor: {type: String, required: true},
    price: {type: Number, required: true}
});

<<<<<<< HEAD
export const DonutModel: Model<DonutInterface> = mongoose.model('Donut', DonutSchema);
=======
export const DonutModel: Model<DonutInterface> = mongoose.model('Donut', DonutSchema);
>>>>>>> master
