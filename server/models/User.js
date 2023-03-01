const mongoose = require('./');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: String,
  email: String,
});

const User = model('User', UserSchema);

module.exports = User;
