
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/nuke/", adminController.nsuke)

router.get("/", adminController.getAdmin)
router.get("/users", adminController.getUsers)
router.get("/projects", adminController.getProjects)

router.get("/create-user/:userType", adminController.createUser)
router.get("/delete-user/:id", adminController.deleteUser)
router.get("/delete-all-users/", adminController.deleteAllUsers)

router.get("/create-project/company/", adminController.createProjectWithCompany)
router.get("/create-project/company/:id", adminController.createProjectWithSpecificCompany)
router.get("/create-project/random", adminController.createProjectWithRandomUser)
router.get("/delete-all-projects/", adminController.deleteAllProjects)
router.get("/delete-project/:id", adminController.deleteProject)
router.get("/student-signup/:projectid/:studentid", adminController.signupStudentToProject)

module.exports = router;