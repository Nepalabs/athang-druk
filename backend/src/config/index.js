const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  forntendUrl: process.env.FRONTEND_URL,
};
