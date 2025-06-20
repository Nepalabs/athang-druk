import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createFood, deleteFood, getAllFoods, updateFood } from "../api/api";
import Nav from "../components/Nav";

const cuisines = [
  {
    name: "Nepalese Cuisine",
    key: "Nepal",
    imgSrc:
      "https://th.bing.com/th/id/OIP.pd-gmXaFHnqeOLAe9EaGyQHaES?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    desc: "Rich flavors of spices, momos, dal bhat, and hearty mountain food.",
  },
  {
    name: "Bhutanese Cuisine",
    key: "Bhutan",
    imgSrc: "https://images.slurrp.com/prod/rich_article/u122yjpw7or.webp",
    desc: "Unique dishes with chili, cheese, and locally sourced ingredients.",
  },
  {
    name: "London Cuisine",
    key: "London",
    imgSrc:
      "https://th.bing.com/th/id/OIP.uaIfs2UEpIePNV8m5pAauwHaEo?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    desc: "Diverse tastes from traditional fish & chips to multicultural street food.",
  },
];

function CuisineSection({ onSelectCuisine, selectedCuisine }) {
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
  completed: false,
};

const Home = () => {
  const [form, setForm] = useState({ ...initialData });
  const [foods, setFoods] = useState([]);
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

      // If no foods found, add demo ones
      if (filteredFoods.length === 0) {
        const sampleData = [
          {
            _id: "demo1",
            name: "Dal Bhat",
            ingredients: "Rice, lentils, garlic, turmeric",
            steps: "Boil lentils, cook rice, serve together.",
            cuisine: "Nepal",
            img: "https://cdn.shopify.com/s/files/1/0223/0981/files/Dal_Bhat_from_Nepal_curry_dhal_lentils_spinach_rice_yogurt.jpg?v=1618366911",
          },
          {
            _id: "demo2",
            name: "Phaksha Paa",
            ingredients: "Pork, radish, red chili",
            steps: "Cook pork with spices and radish.",
            cuisine: "Bhutan",
            img: "https://fis-api.luxuryholidaynepal.com/media/attachments/Phaksha%20Paa%20dish.jpg",
          },
          {
            _id: "demo3",
            name: "Full English Breakfast",
            ingredients: "Eggs, sausage, bacon, beans, toast",
            steps: "Fry ingredients, plate together.",
            cuisine: "London",
            img: "https://unpeeledjournal.com/wp-content/uploads/2023/04/52828774984_d60ccb1d98_b.jpg",
          },
        ];
        const demo = sampleData.filter(
          (f) => f.cuisine.toLowerCase() === cuisineKey.toLowerCase()
        );
        setFoods(demo);
      } else {
        setFoods(filteredFoods);
      }
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
    try {
      e.preventDefault();
      let response;
      if (isUpdate) {
        response = await updateFood(form._id, form);
      } else {
        response = await createFood(form);
      }
      if (response && response.data) {
        await fetchFoodsByCuisine(selectedCuisine);
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
      <Nav />

      {!selectedCuisine && (
        <CuisineSection
          onSelectCuisine={setSelectedCuisine}
          selectedCuisine={selectedCuisine}
        />
      )}

      {selectedCuisine && (
        <>
          <div style={{ margin: "1rem 0" }}>
            <button onClick={() => setSelectedCuisine(null)}>
              ← Back to Cuisines
            </button>
            <h2>Recipes for {selectedCuisine} Cuisine</h2>
          </div>

          <button className="add-button" onClick={() => handleDialog(true)}>
            Add
          </button>

          {loading ? (
            <p>Loading recipes...</p>
          ) : foods.length > 0 ? (
            <ul className="food-list">
              {foods.map((food) => (
                <li key={food._id} className="food-item">
                  {food.img && (
                    <img
                      src={food.img}
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
                  <option value="London">London</option>
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
  );
};

export default Home;
