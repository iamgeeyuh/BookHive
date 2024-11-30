const express = require("express");
const cors = require("cors");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
const connectDB = require("./config/mongodb");
const authRouter = require("./routes/auth");
const roomRouter = require("./routes/room");
const reservationRouter = require("./routes/reservation");
const userRouter = require("./routes/user")

require("dotenv").config();

const app = express();
const port = 5001;

connectDB()
  .then(() => {
    app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
    app.use(express.json());

    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true, 
          secure: false,
        },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use("/auth", authRouter);
    app.use("/room", roomRouter);
    app.use("/reservation", reservationRouter);
    app.use("/user", userRouter);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
