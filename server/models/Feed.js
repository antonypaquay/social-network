const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    content: {type: String, required: true},
    image: {type: String, required: false}
});

module.exports = mongoose.model('Feed', feedSchema);