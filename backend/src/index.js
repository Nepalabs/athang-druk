const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");
const foodRoutes = require("./routes/food.routes");
const { forntendUrl } = require("./config");

const PORT = 3000;
connectMongoDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: forntendUrl,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/food", foodRoutes);

app.get("/health", (_req, res) => res.send("Server is healthy, its connected"));
app.get("/api/test", (_req, res) =>
  res.json({ message: "CORS from 6000 works!" })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
