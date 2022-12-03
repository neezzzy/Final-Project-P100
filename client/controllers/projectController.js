const User = require("../models/userModel");
const Project = require("../models/projectModel");
const moment = require("moment");
module.exports = {
  fetchAllProjects: async function (req, res) {
    let isStudent;
    let isCompany;
    const { page = 1, limit = 3 } = req.query;

    try {
      let projects = await Project.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate({ path: "projectOwnerID" })
        .populate({ path: "studentIDs" });

      const count = await Project.countDocuments();
      totalPages = Math.ceil(count / limit);
      let userAuth0 = req.oidc.user;

      if (req.isAuthenticated) {
        const user = await User.findOne({ email: userAuth0.email });
        if (user.userType === "student") {
          isStudent = true;
        }
        if (user.userType === "company") {
          isCompany = true;
        }
      }
      //http://localhost:3000/projects/?page=4
      res.render("projects", {
        title: "Projects",
        isAuthenticated: req.isAuthenticated,
        projects,
        totalPages,
        count,
        currentPage: page,
        isStudent,
        isCompany,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    }
  },

  saveProject: async function (req, res) {
    let userAuth0 = req.oidc.user;
    const user = await User.findOne({ email: userAuth0.email });
    const projectDetails = new Project({
      name: req.body.projectName,
      description: req.body.projectDescription,
      location: req.body.projectLocation,
      image: req.oidc.user.picture,
      image: user.image,
      startDate: moment(req.body.projectStartDate).format("YYYY-MM-DD"),
      endDate: moment(req.body.projectEndDate).format("YYYY-MM-DD"),
      projectOwnerID: req.body.projectOwnerID,
    });

    projectDetails.save(function (err) {
      if (err) throw err;
      res.redirect("/projects");
    });
  },

  signupToProject: async function (req, res) {
    let userAuth0 = req.oidc.user;
    const student = await User.findOne({ email: userAuth0.email });
    let projectID = req.params.id;
    let project = await Project.findById(projectID);
    try {
      project.studentIDs.push(student._id);
      await project.save();
      res.redirect("/projects");
    } catch (error) {
      console.log(error.message);
    }
  },

  getProjectByID: async function (req, res) {
    const projectId = req.params.id;

    try {
      const project = await Project.findById(projectId);
      res.render("project-edit", {
        project,
        title: "Edit Project",
        isAuthenticated: req.isAuthenticated,
      });
    } catch (error) {
      console.log(error);
    }
  },

  addProject: async function (req, res) {
    let userAuth0 = req.oidc.user;

    try {
      const user = await User.findOne({ email: userAuth0.email });
      res.render("projects-add", {
        title: "Project Add",
        isAuthenticated: req.isAuthenticated,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteProject: async function (req, res) {
    try {
      await Project.findByIdAndRemove(req.params.id);
    } catch (err) {
      console.log(err);
    }

    console.log("Successful deletion");
    res.redirect("/projects");
  },

  editProject: async function (req, res) {
    let userAuth0 = req.oidc.user;
    const user = await User.findOne({ email: userAuth0.email });
    try {
      await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.projectName,
        description: req.body.projectDescription,
        location: req.body.projectLocation,
        image: user.image,
        startDate: moment(req.body.projectStartDate).format("YYYY-MM-DD"),
        endDate: moment(req.body.projectEndDate).format("YYYY-MM-DD"),
      });
      res.redirect("/projects");
    } catch (error) {
      console.log(error);
    }
  },
};
