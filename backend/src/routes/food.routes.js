const express = require("express");
const foodRoutes = express.Router();
const foodController = require("../controllers/food.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");

foodRoutes.get("/", verifyAuth, foodController.getFoods); // working fine

foodRoutes.get("/:id", verifyAuth, foodController.getFoodsById);

foodRoutes.post("/", verifyAuth, foodController.createFood); // works

foodRoutes.put("/:id", verifyAuth, foodController.updateFoodById);

foodRoutes.delete("/:id", verifyAuth, foodController.deletefoodById); // works

foodRoutes.get("/health", (req, res) => {
  res.send("Server is healthy");
});

module.exports = foodRoutes;