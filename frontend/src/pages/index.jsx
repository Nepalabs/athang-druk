import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  createFood,
  deleteFood,
  getAllFoods,
  updateFood,
  getAllCuisines,
} from "../api/api";
import Nav from "../components/Nav";
import "./index.css";

function CuisineSection({ onSelectCuisine, selectedCuisine, cuisines }) {
  return (
    <section className="cuisine-section">
      <h2>Explore World Cuisines</h2>
      <div className="cuisine-cards">
        {cuisines.map(({ name, imgSrc, desc, key }) => {
          const isSelected = selectedCuisine === key;
          return (
            <div
              key={key}
              className={`cuisine-card ${isSelected ? "selected" : ""}`}
              tabIndex={0}
              onClick={() => onSelectCuisine(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelectCuisine(key);
              }}
              style={{
                cursor: "pointer",
                border: isSelected ? "3px solid #4CAF50" : "1px solid #ccc",
                boxShadow: isSelected ? "0 0 10px #4CAF50" : "none",
              }}
            >
              <img src={imgSrc} alt={name} />
              <h3 className="cuisine-name">{name}</h3>
              <p className="cuisine-desc">{desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const initialData = {
  name: "",
  ingredients: "",
  steps: "",
  cuisine: "",
  imageUrl: "", // this will hold preview URL for image display
  completed: false,
};

const Home = () => {
  const [form, setForm] = useState({ ...initialData });
  const [foods, setFoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const isUpdate = !!form._id;

  useEffect(() => {
    if (selectedCuisine) {
      fetchFoodsByCuisine(selectedCuisine);
    }
  }, [selectedCuisine]);

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await getAllCuisines();

        setCuisines(response.data.cuisines);
      } catch (error) {
        console.error(error);
        setCuisines([]);
      }
    };

    fetchCuisines();
  }, []);

  const fetchFoodsByCuisine = async (cuisineKey) => {
    setLoading(true);
    try {
      const response = await getAllFoods();
      let filteredFoods = [];

      if (response.data?.foods) {
        filteredFoods = response.data.foods.filter(
          (food) => food.cuisine.toLowerCase() === cuisineKey.toLowerCase()
        );
      }
      setFoods(filteredFoods);
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
    setLoading(false);
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
        await fetchFoodsByCuisine(selectedCuisine);
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
    e.preventDefault();
    try {
      let response;
      // Otherwise send JSON normally (no file)
      form.cuisine = selectedCuisine;
      if (isUpdate) {
        response = await updateFood(form._id, form);
      } else {
        response = await createFood(form);
      }

      if (response && response.data) {
        await fetchFoodsByCuisine(selectedCuisine);
        setForm({ ...initialData });
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

  console.log(foods);

  return (
    <div>
      <Nav />

      {!selectedCuisine && (
        <CuisineSection
          onSelectCuisine={setSelectedCuisine}
          selectedCuisine={selectedCuisine}
          cuisines={cuisines}
        />
      )}

      {selectedCuisine && (
        <>
          <div style={{ margin: "1rem 0", padding: "3rem" }}>
            <button onClick={() => setSelectedCuisine(null)}>
              ← Back to Cuisines
            </button>
            <h2>Recipes for {selectedCuisine} Cuisine</h2>
          </div>

          {/* Add margin top here to add space between this and above */}
          <button
            className="add-button"
            onClick={() => handleDialog(true)}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
            }}
          >
            Add
          </button>

          {loading ? (
            <p>Loading recipes...</p>
          ) : foods.length > 0 ? (
            <ul className="food-list">
              {foods.map((food) => (
                <li key={food._id} className="food-item">
                  {food.imageUrl && (
                    <img
                      src={food.imageUrl}
                      alt={food.name}
                      style={{
                        maxWidth: "200px",
                        marginBottom: "1rem",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <div>
                    <p className="food-title">{food.name}</p>
                    <p>
                      <strong>Ingredients:</strong> {food.ingredients}
                    </p>
                    <p>
                      <strong>Steps:</strong> {food.steps}
                    </p>
                    <p>
                      <strong>Cuisine:</strong> {food.cuisine}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "1rem" }}
                  >
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
              ))}
            </ul>
          ) : (
            <p>No recipes found for this cuisine.</p>
          )}
        </>
      )}

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

              <input
                type="text"
                name="imageUrl"
                placeholder="Cusine Image URL"
                value={form.imageUrl}
                onChange={handleChange}
                required
              />
              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                    borderRadius: "8px",
                  }}
                />
              )}

              <div className="form-action">
                <button type="submit">{isUpdate ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
