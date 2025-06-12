const foodService = require("../services/food.service");

const deleteFoodById = async (req, res) => {
  const user = req.user;

  const id = req.params.id;
  const isDeleted = await foodService.deleteFoodById(id, user._id);
  if (isDeleted) {
    res.json({ message: `Food ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `Food with ${id} not found` });
  }
};

const getAllFoods = async (req, res) => {
  const user = req.user;
  const { completed } = req.query;

  const filter = {};
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const foods = await foodService.getAllFoods(user._id, filter);
  res.json({ foods });
};

const getFoodById = async (req, res) => {
  const id = req.params.id;

  const user = req.user;

  const food = await foodService.getFoodById(id, user._id);

  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: `Food ${id} not found` });
  }
};

const createFood = async (req, res) => {
  const user = req.user;
  console.log(user);

  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty `,
    });
  }
  const newFood = req.body;

  const keys = Object.keys(newFood);
  const requiredKeys = ["name", "ingredients", "steps", "cuisine"];
  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }
  const createdFood = await foodService.createFood(newFood, user._id);
  res.status(201).json({ message: "New food added", Food: createdFood });
};

const updateFoodById = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  if (!req.body) {
    return res.status(400).json({
      message: `Body cannot be empty!`,
    });
  }

  const newFood = req.body;

  const keys = Object.keys(newFood);
  const requiredKeys = ["name", "ingredients", "steps", "cuisine"];
  const missingKeys = requiredKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const updateFood = await foodService.updateFoodById(id, newFood, user._id);

  if (updateFood) {
    res.json({
      message: `Food ${id} updated successfully`,
      food: updateFood,
    });
  } else {
    res.status(400).json({ message: `Food ${id} not found` });
  }
};

module.exports = {
  deleteFoodById,
  getAllFoods,
  getFoodById,
  createFood,
  updateFoodById,
};
