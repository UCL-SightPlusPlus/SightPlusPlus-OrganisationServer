const mongoose = require('mongoose');

const serverProfileSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('ServerProfile', serverProfileSchema);