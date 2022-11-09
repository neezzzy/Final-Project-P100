// this application is made to make sure, every call is secured....how we can make it secured???.....
// to make sure, every call has a valid token
// In this application, we will check is the token is valid
// after varification, we will give access to a user

require("dotenv").config();
const express = require("express");
const app = express();
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const jwtAuthz = require("express-jwt-authz");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKSURI,
  }),
  requestProperty: "user",
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: ["RS256"],
});

const checkPermissionCompany = jwtAuthz(["read:admin-messages"], {
  customScopeKey: "permissions",
});

const checkPermissionStudent = jwtAuthz(["read:messages"], {
  customScopeKey: "permissions",
});



app.get("/projects", (req, res) => {
  res.json({
    projects: [
      {id: 1, title: "Project 1", description: "Project 1 Description", img: "https://www.placecage.com/250/250", startDate: 2023-01-01},
      {id: 2, title: "Project 2", description: "Project 2 Description", img: "https://www.placecage.com/g/250/250", startDate: 2023-02-01},
      {id: 3, title: "Project 3", description: "Project 3 Description", img: "https://www.placecage.com/c/250/250", startDate: 2023-04-01},
      {id: 4, title: "Project 4", description: "Project 4 Description", img: "https://www.placecage.com/gif/250/250", startDate: 2023-02-15},]
  });
});

// jwt middleware checking if the request has a valid token
app.get("/dashboard", jwtCheck, (req, res) => {
  res.json({
    type: "secured",
  });
});

app.get("/projects-add", jwtCheck, checkPermissionCompany, (req, res) => {
  res.json({
    type: "You are a company :P",
    canLogIn: true,
  });
});

app.get("/projects-signup", jwtCheck, checkPermissionStudent, (req, res) => {
  res.json({
    type: "You are a student :P",
    canLogIn: true,
  });
});

app.listen(5000);
