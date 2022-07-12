const mongoose = require("mongoose");



var productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,

    required: 'This field is required'
  },
  price: {
    type: String
  },
  category: {
    type: String
  },
  supplier: {
    type: String
  },
  description: {
    type: String
  }
});

mongoose.model('Product', productSchema);