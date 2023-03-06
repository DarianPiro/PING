const mongoose = require('./');
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  helper: String,
  rating: Number,
  review: String,
  time: String,
});

const RequestSchema = new Schema({
  content: String,
  type: String,
  status: String,
  images: [String],
  review: ReviewSchema,
  date: Date,
});

const UserSchema = new Schema({
  username: String,
  email: String,
  role: String,
  requests: [RequestSchema],
  socketID: String,
  online: Boolean,
});

const User = model('User', UserSchema);

module.exports = User;
