const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24, //24 HOURS
    keys: [process.env.COOKIE_SECRET],
  })
);

// * Route imports
const auth = require("./routes/Auth");
const user = require("./routes/User");
const questions = require("./routes/Questions");
const tag = require("./routes/Tag");
const post = require("./routes/Post");
const video = require("./routes/Videos");

// * DB
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("Connection to DB failed \n", err);
    return console.log("Connected to DB.");
  }
);
// * Passport Setup
require("./config/userPassport");
app.use(passport.initialize());
app.use(passport.session());

// * Routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/questions", questions);
app.use("/api/tag", tag);
app.use("/api/post", post);
app.use("/api/videos", video);

// * Server
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));
