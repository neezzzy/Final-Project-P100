const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");
const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  res.render("index", { title: "Home", isAuthenticated: req.isAuthenticated });
});

router.get("/projects", projectController.fetchAllProjects);
router.get("/profile", requiresAuth(), userController.fetchUserProfile);

router.get("/dashboard", requiresAuth(), async function (req, res) {
  res.render("dashboard", {
    title: "Dashboard",
    isAuthenticated: req.isAuthenticated,
  });
});

router.get("/projects-signup", requiresAuth(), async (req, res) => {
  res.render("projects-signup", {
    title: "Projects Signup",
    isAuthenticated: req.isAuthenticated,
  });
});

router.get("/project-edit/:id", projectController.getProjectByID);
router.get("/project-delete/:id", projectController.deleteProject);
router.get("/projects-add", requiresAuth(), projectController.addProject);

router.post("/projects-add", projectController.saveProject);
router.post("/project-edit/:id", projectController.editProject);

router.get("/profile-edit/:id", userController.getProfileByID);
router.post("/profile-edit/:id", userController.editProfile);

router.get("/forbidden", (req, res) => {
  res.render("forbidden", {
    title: "403 UNAUTHORIZED",
    isAuthenticated: req.isAuthenticated,
  });
});

router.get("/register", async function (req, res) {
  let isAuthenticated = req.isAuthenticated;

  res.oidc.login({
    returnTo: "/sign-up",
    authorizationParams: { screen_hint: "signup" },
  });
});

router.get("/sign-up", async function (req, res) {
  let isAuthenticated = req.isAuthenticated;

  res.render("sign-up", { title: "Sign-up", isAuthenticated });
});

module.exports = router;
