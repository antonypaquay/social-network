const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    user_email: {type: String, required: true, unique: true},
    user_firstname: {type: String, required: true},
    user_lastname: {type: String, required: true},
    user_pwd: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
