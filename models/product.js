var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, min: 3, max: 20},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    image: {type: String},
    category: [{type: Schema.ObjectId, ref: 'Category'}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


// Export model.
module.exports = mongoose.model('Product', ProductSchema);