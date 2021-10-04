var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShippingAddressSchema = new Schema({
  customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
  order: [{type: Schema.ObjectId, ref: 'Order'}],
  name: {type: String},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  zipcode: {type: String},
  date_added: {type: Date, default: Date.now},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('ShippingAddress', ShippingAddressSchema);