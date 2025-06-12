const express = require("express");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.routes");

connectMongoDB();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/food", foodRoutes);

app.get("/", (req, res) => {
  res.send(`Server is up and running`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
