const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: String,
    ingredients: String,
    steps: String,
    cuisine: String,
    imageUrl: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const Food = mongoose.model("food", FoodSchema);
module.exports = Food;
