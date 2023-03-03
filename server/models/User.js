const mongoose = require('./');
const { Schema, model } = mongoose;

const RequestSchema = new Schema({
  content: String,
  type: String,
  status: String,
  images: [String],
});

const ReviewSchema = new Schema({
  content: String,
  rating: Number,
});

const UserSchema = new Schema({
  username: String,
  email: String,
  role: String,
  requests: [RequestSchema],
  reviews: [ReviewSchema],
  socketID: String,
  online: Boolean,
});

const User = model('User', UserSchema);

module.exports = User;
