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
    email: {type: String, unique: true},
});

CustomerSchema.pre('remove', function(next) {
  this.model('Ticket').deleteMany({ owner: this._id });
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
  const Customer = this;
  const compare = await bcrypt.compare(password, Customer.password);

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