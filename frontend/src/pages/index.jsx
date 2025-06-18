import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createFood, deleteFood, getAllFoods, updateFood } from "../api/api";
import { Link } from "react-router-dom";

const initialData = {
  name: "",
  ingredients: "",
  steps: "",
  cuisine: "",
  completed: false,
};

const Home = () => {
  const [form, setForm] = useState({ ...initialData });
  const [foods, setfoods] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { user, logout } = useAuth();

  const isUpdate = !!form._id;

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const response = await getAllFoods();
    setfoods(response.data?.foods || []);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDialog = (isOpen) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      setForm({ ...initialData });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteFood(id);
      if (response && response.data) {
        await fetchFoods();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm({ ...form, [name]: name === "completed" ? checked : value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let response;
      if (isUpdate) {
        // update
        response = await updateFood(form._id, form);
      } else {
        response = await createFood(form);
      }
      if (response && response.data) {
        await fetchFoods();
        handleDialog(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (food) => {
    const { userId, __v, ...data } = food;
    handleDialog(true);
    setForm(data);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Druk Food Recipe</div>
        <div className="nav-right">
          <span className="user-info"> {user?.name || "User"}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        <Link to="/about" className="about-button">
            About
          </Link>
        </div>
      </nav>
      <div className="food-container">
        <h1>Food Recipe List</h1>
        <button className="add-button" onClick={() => handleDialog(true)}>
          Add
        </button>
        <ul className="food-list">
          {foods.length > 0 ? (
            foods.map((food) => (
              <li key={food._id} className="food-item">
                <div>
                  <p className="food-title">{food.name}</p>
                  <p>{food.ingredients}</p>
                  <small>{food.steps}</small>
                  {food.completed && <p className="completed">Completed</p>}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="update-button"
                    onClick={() => handleUpdate(food)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div style={{ fontSize: "1.8em" }}>Add your own Recipe</div>
          )}
        </ul>

        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button type="button" onClick={() => handleDialog(false)}>
                  x
                </button>
              </div>
              <h2>{isUpdate ? "Update Food" : "Add Food"}</h2>
              <form className="food-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="ingredients"
                  placeholder="Ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="steps"
                  placeholder="Steps"
                  value={form.steps}
                  onChange={handleChange}
                />
                <label>
                  Cuisine
                  <select
                    name="cuisine"
                    value={form.cuisine}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Cuisine --</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Thai">Thai</option>
                    <option value="Greek">Greek</option>
                    <option value="American">American</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </label>

                <div className="form-action">
                  <button type="submit">{isUpdate ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
