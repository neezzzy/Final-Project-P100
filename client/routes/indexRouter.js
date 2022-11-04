const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/", function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("index", { title: "Home", isAuthenticated });
});

router.get("/projects", function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("projects", { title: "Projects", isAuthenticated });
});

router.get("/profile", function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("profile", { title: "Profile", isAuthenticated });
});

router.get("/dashboard", function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("dashboard", { title: "Dashboard", isAuthenticated });
});

module.exports = router;
