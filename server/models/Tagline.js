const mongoose = require('.') 
const { Schema, model } = mongoose;

const TaglineSchema = new Schema({
  tagline: String,
});

const Tagline = model("Tagline", TaglineSchema);

module.exports = Tagline;