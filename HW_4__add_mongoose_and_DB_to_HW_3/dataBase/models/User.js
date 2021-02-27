const { Schema, model } = require('mongoose');

// const carSchema = require('./Car');

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  cars: [
    { model: { type: String } },
    { price: { type: Number } }
  ]
});

module.exports = model('User', userSchema);
