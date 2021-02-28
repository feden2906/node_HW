const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  model: { type: String },
  price: { type: Number }
});

module.exports = model('Car', carSchema);
