const mongoose = require("mongoose");

const CuisineSchema = new mongoose.Schema(
  {
    name: String,
    key: String,
    desc: String,
    imgSrc: String,
  },
  { timestamps: true }
);

const Cuisine = mongoose.model("cuisine", CuisineSchema);
module.exports = Cuisine;
