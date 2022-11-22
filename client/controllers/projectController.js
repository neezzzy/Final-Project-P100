const User = require("../models/userModel");
const Project = require("../models/projectModel");
const moment = require("moment");
module.exports = {

  fetchAllProjects: async function (req, res) {
    try {
      let projects = await Project.find().populate({path: 'projectOwnerID'});

      let user = req.oidc.user;
      res.render("projects", {
        title: "Projects",
        isAuthenticated: req.isAuthenticated,
        projects,
        isStudent: user.role.includes("Student"),
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  },

  saveProject: async function (req, res) {

    const projectDetails = new Project({
      name: req.body.projectName,
      description: req.body.projectDescription,
      location: req.body.projectLocation,
      image: req.oidc.user.picture,
      startDate: moment(req.body.projectStartDate).format("YYYY-MM-DD"),
      endDate: moment(req.body.projectEndDate).format("YYYY-MM-DD"),
      projectOwnerID: req.body.projectOwnerID,
    });

    projectDetails.save(function (err) {
      if (err) throw err;
      res.redirect("/projects");
    });
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
        user
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
    try {
      await Project.findByIdAndUpdate(req.params.id, {
        name: req.body.projectName,
        description: req.body.projectDescription,
        location: req.body.projectLocation,
        image: req.oidc.user.picture,
        startDate: moment(req.body.projectStartDate).format("YYYY-MM-DD"),
        endDate: moment(req.body.projectEndDate).format("YYYY-MM-DD"),
      });
      res.redirect("/projects");
    } catch (error) {
      console.log(error);
    }
  },
};
