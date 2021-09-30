var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'Customer'},
    complete: {type: Boolean, default: false},
    date_order = {type: Date, default: Date.now},
});

// Export model.
module.exports = mongoose.model('Order', OrderSchema);