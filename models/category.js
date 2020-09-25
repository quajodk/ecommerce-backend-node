const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Please enter category"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
