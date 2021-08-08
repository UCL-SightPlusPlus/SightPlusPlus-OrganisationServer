const mongoose = require('mongoose');

const serverProfileSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        unique : true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    }
});

module.exports = mongoose.model('ServerProfile', serverProfileSchema);