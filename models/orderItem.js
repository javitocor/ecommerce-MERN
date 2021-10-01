var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderItemSchema = new Schema({
  product: {type: Schema.ObjectId, ref: 'Product', required: true},
  order: {type: Schema.ObjectId, ref: 'Order', required: true},
  quantity: {type: Number, min: 1, required: true},
  date_added: {type: Date, default: Date.now},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Product = require('./product');
OrderItemSchema.methods.getTotalPrice = async function() {
  const product = await Product.findById(this.product);
  const total = product.price * this.quantity;
  return total;
}



module.exports = mongoose.model('OrderItem', OrderItemSchema);