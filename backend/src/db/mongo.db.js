const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sonam:3lCj4MY9nAQhMEkw@lwp.7tuav.mongodb.net/athang-druk"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
