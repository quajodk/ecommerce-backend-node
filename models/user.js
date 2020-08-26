const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    require: [true, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter valid password'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', UserSchema);
