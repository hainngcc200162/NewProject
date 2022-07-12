const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  spname: {
    type: String,
    unique: true,
    trim: true,

    required: 'This field is required'
  },
  spaddress: {
    type: String,
    unique: true,
    trim: true,

    required: 'This field is required'
  }
});

mongoose.model('Supplier', supplierSchema);
module.exports = supplierSchema;