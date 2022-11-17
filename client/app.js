require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/indexRouter");
const { auth } = require("express-openid-connect");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { isAuthenticated } = require("./middleware/authenticate");

const config = {
  authRequired: false,
  auth0Logout: true,
  // secret - A long, random string
  secret: process.env.SECRET,
  // baseURL - The URL where the application is served
  baseURL: process.env.BASE_URL,
  // clientID - The Client ID found in your Application settings
  clientID: process.env.CLIENT_ID,
  // issuerBaseURL - The Domain as a secure URL found in your Application settings
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: "code",
    audience: process.env.AUDIENCE,
    scope: "openid profile email",
  },
};

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(auth(config));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", isAuthenticated, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("404", { title: "404 NOT FOUND" });
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

connectDb().then(async () => {
  console.log("MongoDB is connected");
});

module.exports = app;
