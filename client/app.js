require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/indexRouter");
const { auth } = require("express-openid-connect");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
    audience: "http://localhost:5000",
    scope: "openid profile email",
  },
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.redirect("/not-found")
  // next(createError(404));
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

module.exports = app;
