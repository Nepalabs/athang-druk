const foodsService = require("../servers/food.server");

const getfoodById = async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const food = await foodsService.getfoodById(id, user._id);

  if (food) {
    res.json(food);
  } else {
    res.status(404).json({ message: `Food ${id} not found` });
  }
};

module.exports = {
  getfoodById,
};
