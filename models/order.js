var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customer: {type: Schema.ObjectId, ref: 'Customer', required: true},
    complete: {type: Boolean, default: false},
    date_order = {type: Date, default: Date.now},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// Export model.
module.exports = mongoose.model('Order', OrderSchema);