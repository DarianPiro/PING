const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb+srv://P1ro:oDOaxYB8Du3Y9GJx@piro.f8cbqeh.mongodb.net/ping?retryWrites=true&w=majority",  
  console.log('💗 Connected to database 💗')
  );
} catch (error) {
  console.error(error);
}

module.exports = mongoose;