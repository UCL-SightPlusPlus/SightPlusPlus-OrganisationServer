const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
      },
      deviceType: {
        type: String,
        required: true,
      },
      deviceLocation: {
        type: String,
        required: true,
      },
      site: {
        type: String,
        required: true,
      },
      isIndoor: {
        type: Boolean,
        required: true,
      },
      floor: {
        type: Number,
      },
      maxOccupancy: {
        type: Number,
      },
      running: {
          type: Number,
      }
});

const serverProfileSchema = new mongoose.Schema({
    site_name: {
        type: String,
        required: true,
    },
    devices: [deviceSchema],
    url: {
        type: String,
    }
});

module.exports = mongoose.model('ServerProfile', serverProfileSchema);