const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Order', orderSchema);