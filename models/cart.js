const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  checkout: {
    type: Boolean,
    default: false,
  },
  total: Number,
  dateAdded: Date,
});

module.exports = mongoose.model('Cart', CartSchema);
