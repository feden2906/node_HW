const { Schema, model } = require('mongoose');

const carSchema = {
  model: { type: String },
  price: { type: Number }
};

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  cars: [carSchema]
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('full_name').get(function() {
  return `${this.name} ${this.age}`;
});

module.exports = model('User', userSchema);
