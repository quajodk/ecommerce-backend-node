const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  token: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  login: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Token', TokenSchema);
