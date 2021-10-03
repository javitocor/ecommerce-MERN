var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 25},
    description: {type: String, minLength: 15, maxLength: 600},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    image: {type: String},
    category: [{type: Schema.ObjectId, ref: 'Category'}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});


// Export model.
module.exports = mongoose.model('Product', ProductSchema);