import axios from "../config/axiosConfig";

const getAllFoods = () => {
  return axios.get("/food");
};
const createFood = (data) => {
  return axios.post("/food/", data);
};
const deleteFood = (id) => {
  return axios.delete(`/food/${id}`);
};
const updateFood = (id, data) => {
  return axios.put(`/food/${id}`, data);
};

const getAllCuisines = () => {
  return axios.get(`/food/cuisines`);
};
const registerUser = (formData) => {
  return axios.post(`/auth/signup`, formData);
};
const loginUser = (formData) => {
  return axios.post(`/auth/signin`, formData);
};
const getloginUser = () => {
  return axios.get(`/auth/loggedin-user`);
};

export {
  getAllFoods,
  updateFood,
  deleteFood,
  createFood,
  getAllCuisines,
  registerUser,
  loginUser,
  getloginUser,
};
