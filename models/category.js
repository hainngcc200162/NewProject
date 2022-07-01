const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  catname: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: 'This field is required'
  },
  catdescription: {
    type: String,

  }
});

mongoose.model('Category', categorySchema);
module.exports = categorySchema;