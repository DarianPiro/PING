const mongoose = require("mongoose");

try {
  mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost:27017/your-database-name",
  console.log('💗 Connected to database 💗')
  );
} catch (error) {
  console.error(error);
}

module.exports = mongoose;