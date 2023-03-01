const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb://localhost:27017/ping",  
  console.log('💗 Connected to database 💗')
  );
} catch (error) {
  console.error(error);
}

module.exports = mongoose;