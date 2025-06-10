const express = require("express");
const connectMongoDB = require("./src/db/mongo.db");


connectMongoDB();

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Server is up and running`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
