var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
    complete: {type: Boolean, default: false},
    date_order: {type: Date, default: Date.now},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

OrderSchema.pre('remove', function(next) {
    this.model('OrderItem').deleteMany({ customer: this._id });
    next();
  });

const OrderItem = require('./orderItem');
OrderSchema.methods.getTotalItems = async function() {
  const total = await OrderItem.find({ order: this._id})
  return total.length;
}

OrderSchema.methods.getCartTotal = async function() {
  const totalItems = await OrderItem.find({ order: this._id})
  totalItems.reduce((previousValue, currentValue) => { return previousValue + currentValue.getTotalPrice() }, 0 )
  return total.length;
}

// Export model.
module.exports = mongoose.model('Order', OrderSchema);