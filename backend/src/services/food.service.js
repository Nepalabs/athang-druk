const Food = require("../models/food.model");

const getAllFoods = async (loggedInUserId, filter = {}) => {
  const foods = await Food.find({ userId: loggedInUserId, ...filter });
  return foods;
};

const getFoodById = async (id, loggedInUserId) => {
  const food = await Food.findOne({ _id: id, userId: loggedInUserId });
  return food;
};

const createFood = async (newFood, loggedInUserId) => {
  newFood.userId = loggedInUserId;
  const food = new Food(newFood);
  const savedFood = await food.save();
  return savedFood;
};

const updateFoodById = async (id, newFood, loggedInUserId) => {
  const update = await Food.updateOne(
    { _id: id, userId: loggedInUserId },
    { $set: newFood }
  );
  if (update.matchedCount > 0) {
    const updateFood = await Food.findOne({ _id: id });
    return updateFood;
  } else {
    return;
  }
};

const deleteFoodById = async (id, loggedInUser) => {
  const deleted = await Food.deleteOne({ _id: id, userId: loggedInUser });
  if (deleted.deletedCount > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFoodById,
  deleteFoodById,
};
