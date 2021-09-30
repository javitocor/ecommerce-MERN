var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
    name : { type: String, required: true, unique: true },
});


module.exports = mongoose.model('Role', RoleSchema);