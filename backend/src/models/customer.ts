import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: String,
  email: String,
  phone_number: String,
  password: String
//   addresses: []
});

module.exports = mongoose.model('Customer', customerSchema);