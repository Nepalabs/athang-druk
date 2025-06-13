import axios from "../config/axiosConfig";

const getAllFoods = () => {
  return axios.get("/foods");
};
const createFood = (data) => {
  return axios.post("/foods/", data);
};
const deleteFood = () => {
  return axios.delete(`"/foods/${id}"`);
};
const updateFood = (id, data) => {
  return axios.put(`/foods/${id}`, data);
};

export { getAllFoods, updateFood, deleteFood, createFood };
