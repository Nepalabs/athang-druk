import axios from "../config/axiosConfig";

const loggedUser=()=>{
  return axios.get("/auth/loggedin-user")
}
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

export { getAllFoods, updateFood, deleteFood, createFood,loggedUser };
