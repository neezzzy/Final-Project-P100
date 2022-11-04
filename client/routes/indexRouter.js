const express = require("express");
const axios = require("axios");
const router = express.Router();
const {
  requiresAuth,
  claimEquals,
  claimIncludes,
  claimCheck,
} = require("express-openid-connect");




router.get("/", function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("index", { title: "Home", isAuthenticated });
});

router.get("/projects", async (req, res, next) => {
  let isAuthenticated = req.oidc.isAuthenticated();
  let data = {};

  try {
    const apiResponse = await axios.get("http://localhost:5000/projects");
    data = apiResponse.data;
  } catch (err) {
    console.log(err);
  }

  res.render("projects", { title: "Projects", isAuthenticated, data });
});

router.get("/profile", requiresAuth(), function (req, res, next) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("profile", { title: "Profile", isAuthenticated });
});

router.get("/dashboard", requiresAuth(), async function (req, res) {
  let data = {};
  let isAuthenticated = req.oidc.isAuthenticated();
  let { token_type, access_token } = req.oidc.accessToken;

  try {
    const apiResponse = await axios.get("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    data = apiResponse.data;
  } catch (err) {
    console.log(err);
  }

  res.render("dashboard", { title: "Dashboard", isAuthenticated, data });
});

router.get("/projects-signup", requiresAuth(), async (req, res) => {
  let data = {};
  let isAuthenticated = req.oidc.isAuthenticated();
  let { token_type, access_token } = req.oidc.accessToken;

  try {
    const apiResponse = await axios.get(
      "http://localhost:5000/projects-signup",
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    data = apiResponse.data;
  } catch (err) {
    console.log(err);
  }

  if (data.canLogIn) {
    res.render("projects-signup", {
      title: "Projects Signup",
      isAuthenticated,
      data,
    });
  } else {
    res.redirect("/not-found");
  }
});

router.get("/not-found", (req, res) => {
  res.render("404", { title: "404 not found" });
});

router.get("/projects-add", requiresAuth(), async function (req, res) {
  let data = {};
  let isAuthenticated = req.oidc.isAuthenticated();
  let { token_type, access_token } = req.oidc.accessToken;

  try {
    const apiResponse = await axios.get("http://localhost:5000/projects-add", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    data = apiResponse.data;
  } catch (err) {
    console.log(err);
  }

  if (data.canLogIn) {
    res.render("projects-add", {
      title: "Project Add",
      isAuthenticated,
      data,
    });
  } else {
    res.redirect("/not-found");
  }
});

module.exports = router;
