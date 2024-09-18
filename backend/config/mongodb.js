const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ndlq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to MongoDB");
        resolve();
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        reject(error);
      });
  });
};

module.exports = connectDB;