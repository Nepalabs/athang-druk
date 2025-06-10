const foodService = require("../servers/food.service");

const getFoods = async (req, res) => {
  const user = req.user;
  const { completed } = req.query;
  const filter = {};
  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  const foods = await foodService.getFoods(user._id, filter);
  res.json({ foods });
};

const getFoodsById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const todo = await foodService.getFoodsById(id, user._id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: `Food recipe with the given id ${id} not found` });
  }
};

const createFood = async (req, res) => {
  const user = req.user; //in servuice add loggefinuserid
  if (!req.body) {
    return res.status(400).json({
      message: `Fields cannot be Empty`,
    });
  }

  const newToDo = req.body;
  const keys = Object.keys(newFood);
const requireKeys = ["name", "ingredients", "steps", "cuisine"];
  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const createdFood = await foodService.createFood(newFood, user._id);
  res.status(201).json({ message: " New todo created", Food: createdFood});
};

const updateFoodById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  if (!req.body) {
    return res.status(400).json({
      message: `Fields cannot be Empty`,
    });
  }
  const newFood = req.body;

  const keys = Object.keys(newFood);
  const requireKeys = ["name", "ingredients", "steps", "cuisine"];
  const missingKeys = requireKeys.filter((key) => !keys.includes(key));

  if (missingKeys.length > 0) {
    return res.status(400).json({
      message: `Please provide all information: ${missingKeys.join(",")}`,
    });
  }

  const updateFood = await FoodService.updateFoodById(id, newFood,user._id);

  if (updateFood) {
    res.json({
      message: `Food recipe with ${id} update successfully`,
      todo: updateFood,
    });
  } else {
    res.status(404).json({ message: `Food recipe with ${id} not found` });
  }
};

const deletefoodById = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const isDeleted = await foodService.deleteFoodById(id, user._id);

  if (isDeleted) {
    res.json({ message: `food recipe ${id} deleted successfully` });
  } else {
    res.status(404).json({ message: `food recipe ${id} not found` });
  }
};
module.exports = {
  getFoods,
  getFoodsById,
  createFood,
  updateFoodById,
  deletefoodById
};
