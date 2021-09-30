var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
  product: {type: Schema.ObjectId, ref: 'Product', required: true},
  order: {type: Schema.ObjectId, ref: 'Order', required: true},
  quantity: {type: Number, min: 1, required: true},
  date_added: {type: Date, default: Date.now},
});


module.exports = mongoose.model('OrderItem', OrderItemSchema);