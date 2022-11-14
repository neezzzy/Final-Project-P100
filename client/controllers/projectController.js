const Project = require("../models/projectModel");

module.exports = {
  fetchAllProject: async function (req, res) {
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
};
