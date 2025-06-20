const express = require("express");
const foodRoutes = express.Router();
const foodController = require("../controllers/food.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");

foodRoutes.get("/", verifyAuth, foodController.getAllFoods); // working fine

foodRoutes.get("/cuisines", verifyAuth, foodController.getAllCuisines); // working fine

foodRoutes.get("/:id", verifyAuth, foodController.getFoodById);

foodRoutes.post("/", verifyAuth, foodController.createFood); // works

foodRoutes.put("/:id", verifyAuth, foodController.updateFoodById);

foodRoutes.delete("/:id", verifyAuth, foodController.deleteFoodById); // works

foodRoutes.get("/health", (req, res) => {
  res.send("Server is healthy");
});

module.exports = foodRoutes;
