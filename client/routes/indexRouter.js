const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");
const projectController = require("../controllers/projectController");
const userController = require("../controllers/userController");

router.get("/", function (req, res) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("index", { title: "Home", isAuthenticated });
});

router.get("/projects", projectController.fetchAllProjects);

router.get("/profile", requiresAuth(), userController.fetchUserProfile);

router.get("/dashboard", requiresAuth(), async function (req, res) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("dashboard", { title: "Dashboard", isAuthenticated });
});

router.get("/projects-signup", requiresAuth(), async (req, res) => {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("projects-signup", {
    title: "Projects Signup",
    isAuthenticated,
  });
});

router.get("/project-edit/:id", projectController.getProjectByID);
router.get("/project-delete/:id", projectController.deleteProject);

router.get("/projects-add", requiresAuth(), async function (req, res) {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("projects-add", { title: "Project Add", isAuthenticated });
});

router.post("/projects-add", projectController.saveProject);
router.post("/project-edit/:id", projectController.editProject);

router.get("/forbidden", (req, res) => {
  let isAuthenticated = req.oidc.isAuthenticated();
  res.render("forbidden", { title: "403 UNAUTHORIZED", isAuthenticated });
});

module.exports = router;
