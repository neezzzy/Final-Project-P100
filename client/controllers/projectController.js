const Project = require("../models/projectModel");

module.exports = {
  fetchAllProjects: async function (req, res) {
    let isAuthenticated = req.oidc.isAuthenticated();
    try {
      const projects = await Project.find();
      res.render("projects", { title: "Projects", isAuthenticated, projects });
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
      startDate: req.body.projectStartDate,
      endDate: req.body.projectEndDate,
    });

    projectDetails.save(function (err) {
      if (err) throw err;
      res.redirect("/projects");
    });
  },

  getProjectByID: async function (req, res) {
    const projectId = req.params.id;
    let isAuthenticated = req.oidc.isAuthenticated();
    try {
      const project = await Project.findById(projectId);
      res.render("project-edit", {
        project,
        title: "Edit Project",
        isAuthenticated,
      });
    } catch (error) {
      console.log(errorr);
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
        startDate: req.body.projectStartDate,
        endDate: req.body.projectEndDate,
      });
      res.redirect("/projects");

    } catch (error) {
      console.log(error);
    }
  },
};