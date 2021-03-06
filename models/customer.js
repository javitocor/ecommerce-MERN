var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Role = require('../models/role');

var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    username: {type: String, required: true, min:3, unique: true},
    firstname: {type: String, min:3, default: null},
    lastname: {type: String, min:3, default: null},
    password: {type: String, required: true, min: 5},
    phone: {type: Number, default: null},
    role: {type: Schema.ObjectId, ref: 'Role'},
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      required: [true, 'Email required']
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

CustomerSchema.pre('remove', function(next) {
  this.model('Order').deleteMany({ customer: this._id });
  this.model('ShippingAddress').deleteMany({ customer: this._id });
  next();
});

CustomerSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    
    const role = await Role.findOne({ name: 'Basic'});
    this.role = role._id;

    next();
  }
);

CustomerSchema.methods.isValidPassword = async function(password) {
  const customer = this;
  const compare = await bcrypt.compare(password, customer.password);

  return compare;
}


// Virtual for this Customer instance URL.
CustomerSchema
.virtual('url')
.get(function () {
  return '/Customers/'+this._id;
});

// Export model.
module.exports = mongoose.model('Customer', CustomerSchema);