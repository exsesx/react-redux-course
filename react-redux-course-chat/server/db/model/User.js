const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

// Compile model from schema
let User = mongoose.model('User', UserSchema);

module.exports = User;