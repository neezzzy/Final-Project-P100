const User = require("../models/userModel");
const Project = require("../models/projectModel");
const faker = require('@faker-js/faker');
const moment = require("moment");
module.exports = {
    
    nuke: async function (req, res) {
        try {
            const dropUser = User.collection.drop()
            const dropProject = Project.collection.drop()
            await Promise.all([dropUser, dropProject])
        } catch (err) {
            console.log(err.message)
        }
        console.log("Successful deletion"); // Replace with Flash
        res.redirect("/admin");
    },
    getAdmin: async function (req, res) {
        try {
            res.render("admin", { 
                title: "Admin",
             });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: err.message,
              });
        }
    },
    getUsers: async function (req, res) {
        try {
            let users = await User.find()
            let projects = await Project.find().populate({path: 'projectOwnerID'}).populate({path: 'studentIDs'});
            res.render("admin/users", { 
                title: "Users",
                users,
                projects,
             });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: err.message,
              });
        }
    },
    getProjects: async function (req, res) {
        try {
            let projects = await Project.find().populate({path: 'projectOwnerID'});
            res.render("admin/projects", { 
                title: "Projects",
                projects
             });
        } catch (error) {
            res.status(404).json({
                status: "fail",
                message: err.message,
              });
        }
    },
    
    createUser: async function (req, res) {
        let userType = req.params.userType
        let name
        let image
        if (userType === "student"){
            name = faker.faker.name.fullName()
            image = faker.faker.image.avatar()
        }
        if(userType === "company"){
            name = faker.faker.company.name()
            image = faker.faker.image.business()
        }
        try {
            const newUser = new User({
                name: name,
                email: faker.faker.internet.email(),
                userType: userType,
                country: faker.faker.address.country(),
                image: image
            
            });
            await newUser.save(function (err, createUser) {
                res.redirect(`/admin/users`);
            });
        } catch (error) {
            console.log(error.message)
        }
    },

    deleteUser: async function (req, res) {
        try {
          await User.findByIdAndRemove(req.params.id);
        } catch (err) {
            console.log(err.message)
        }
        console.log("Successful deletion"); // Replace with Flash
        res.redirect("/admin/users");
      },

    deleteAllUsers: async function (req, res) {
        let redirect = ""
        if (req.params.redirect){redirect = req.params.redirect}

        try{ 
            await User.collection.drop()
        } catch (err) {
            console.log(err.message)
        }
        console.log("Successful deletion"); // Replace with Flash
        res.redirect(`/admin/${redirect}`);
    },
    createProjectWithCompany: async function (req, res) {

        // Warning sus code below
        try {
            await User.findOne({ userType: "company" }).sort({createdAt: -1}).exec(function (err, foundCompany) {
                const projectDetails = new Project({
                    name: faker.faker.company.bsAdjective(),
                    description: faker.faker.company.catchPhrase(),
                    location: faker.faker.address.cityName(),
                    image: faker.faker.image.abstract(),
                    startDate: moment(faker.faker.date.soon(5)).format("YYYY-MM-DD"),
                    endDate: moment(faker.faker.date.future()).format("YYYY-MM-DD"),
                    projectOwnerID: foundCompany,
                });
                if (!foundCompany) {
                    console.log("No Company"); // Replace with Flash
                    res.redirect("/admin/projects");
                } else {
                    projectDetails.save(function (err) {
                        if (err) throw err;
                        res.redirect("/admin/projects");
                    });
                }
            });

        } catch (err) {
            res.status(404).json({
                status: "fail",
                message: err.message,
            });
        }
    },
    createProjectWithSpecificCompany: async function (req, res) {

        // Should combine with code above

        let companyID = req.params.id

        try {
            const projectDetails = new Project({
                name: faker.faker.company.bsAdjective(),
                description: faker.faker.company.catchPhrase(),
                location: faker.faker.address.cityName(),
                image: faker.faker.image.abstract(),
                startDate: moment(faker.faker.date.soon(5)).format("YYYY-MM-DD"),
                endDate: moment(faker.faker.date.future()).format("YYYY-MM-DD"),
                projectOwnerID: companyID,
            });
            projectDetails.save(function (err) {
                if (err) throw err;
                res.redirect("/admin/users");
            });
        } catch (err) {
            res.status(404).json({
                status: "fail",
                message: err.message,
            });
        }
    },
    createProjectWithRandomUser: async function (req, res) {
        try {
            await User.count().exec(function (err, count) {
                const random = Math.floor(Math.random() * count);

                // Warning sus code below
                
                // Sometimes just misfires to student
                // might need to use aggregation or something, dunno

                User.findOne({userType:"company"}).skip(random).exec(
                    
                    function (err, foundCompany) {
                        const projectDetails = new Project({
                            name: faker.faker.company.bsAdjective(),
                            description: faker.faker.company.catchPhrase(),
                            location: faker.faker.address.cityName(),
                            image: faker.faker.image.abstract(),
                            startDate: moment(faker.faker.date.soon(5)).format("YYYY-MM-DD"),
                            endDate: moment(faker.faker.date.future()).format("YYYY-MM-DD"),
                            projectOwnerID: foundCompany,
                        });
                        if (!foundCompany) {
                            console.log("Not Company, try again"); // Replace with Flash
                            res.redirect("/admin/projects");
                        } else {
                            projectDetails.save(function (err) {
                                if (err) throw err;
                                res.redirect("/admin/projects");
                            });
                        }
                    });
            });
        } catch (err) {
            res.status(404).json({
                status: "fail",
                message: err.message,
            });
        }
    },

    deleteAllProjects: async function (req, res) {
        let redirect = ""
        if (req.params.redirect){redirect = req.params.redirect}

        try{ 
            await Project.collection.drop()
        } catch (err) {
            console.log(err.message)
        }
        console.log("Successful deletion"); // Replace with Flash
        res.redirect(`/admin/${redirect}`);
    },

    deleteProject: async function (req, res) {
        try {
          await Project.findByIdAndRemove(req.params.id);
        } catch (err) {
            console.log(err.message)
        }
        console.log("Successful deletion");
        res.redirect("/admin/projects");
      },

    signupStudentToProject: async function (req, res) {
        let projectID = req.params.projectid
        let studentID = req.params.studentid

        let project = await Project.findById(projectID)
        try {
          project.studentIDs.push(studentID)
          await project.save();
          res.redirect("/admin/users")
        } catch (error) {
          console.log(error.message);
        }
      },

}