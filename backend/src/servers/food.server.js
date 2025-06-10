const Todo = require("../models/todo.model");

const getFoods = async (loggedInUserId, filter = {}) => {
  const todos = await Todo.find({ userId: loggedInUserId, ...filter });
  return todos;
};

module.exports = {
  getFoods,
};
