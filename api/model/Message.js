let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: String,
  message: String
});

module.exports = mongoose.model('Message', messageSchema);