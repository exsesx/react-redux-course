const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    profile: {
        firstName: { type: String },
        lastName: { type: String }
    }
});

// Compile model from schema
let User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    User.findOne({ username }, callback).lean();
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;

        callback(null, isMatch);
    });
};

module.exports.getAllUsers = function (callback) {
    User.find().lean().exec(function (err, users) {
        if (err) throw err;
        callback(null, users)
    });
};

module.exports.getAllUsersExceptCurrent = function(user, callback) {
    User.find({_id: {$ne: user._id}}).lean().exec(function (err, users) {
        if(err) throw err;
        callback(null, users);
    })
};