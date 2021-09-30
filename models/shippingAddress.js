var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShippingAddressSchema = new Schema({
  customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
  order: {type: Schema.ObjectId, ref: 'Order', required: true},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  zipcode: {type: String},
  date_added: {type: Date, default: Date.now},
});


module.exports = mongoose.model('ShippingAddress', ShippingAddressSchema);