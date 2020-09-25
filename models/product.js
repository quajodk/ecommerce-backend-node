const { Mixed } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a title"],
  },
  details: {
    type: Map,
    of: Mixed,
  },
  images: [String],
  published: {
    type: Boolean,
    default: false,
  },
  tag: { type: String },
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", ProductSchema);
