let mongoose = require('mongoose');

let adminSchema = mongoose.Schema({
  mobileNo: {
    type: Number,
    default: 0000
  },
  mobileId: {
    type: String
  },
  access: {
    type: String,
    default: null,
    required: false
  }
}, {
  collection: 'admin'
});

module.exports = mongoose.model('Admin', adminSchema);