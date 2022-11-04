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
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

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

const checkPermission = jwtAuthz(["read:messages"], {
  customScopeKey: "permissions",
});


app.get("/projects", (req, res) => {
  res.json({
    type: "public",
  });
});

// jwt middleware checking if the request has a valid token
app.get("/dashboard", jwtCheck, (req, res) => {
  res.json({
    type: "secured",
  });
});

app.get("/projects-add", jwtCheck, checkPermission, (req, res) => {
  res.json({
    type: "You are a company :P",
  });
});

app.listen(5000);
