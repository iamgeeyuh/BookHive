const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");

const app = express();
const port = 5001;

connectDB()
  .then(() => {
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(express.json());

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
