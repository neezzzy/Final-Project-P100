const User = require("../models/userModel");
const Project = require("../models/projectModel");
const faker = require('@faker-js/faker');
const moment = require("moment");
module.exports = {
    
    getAdmin: async function (req, res) {
        try {
            let users = await User.find()
            res.render("admin", { 
                title: "Admin",
                users
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
            res.render("admin/users", { 
                title: "Users",
                users
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
            console.log(error.message)
        }
        console.log("Successful deletion");
        res.redirect("/admin/users");
      },

    deleteAllUsers: async function (req, res) {
        try{ 
            await User.collection.drop()
        } catch (err) {
            console.log(error.message)
        }
        console.log("Successful deletion");
        res.redirect("/admin/users");
    },
    createProject: async function (req, res) {
        try {
            await User.count().exec(function (err, count) {
                const random = Math.floor(Math.random() * count);
                User.findOne().skip(random).exec(
                    
                    function (err, result) {
                        const projectDetails = new Project({
                            name: faker.faker.company.bsAdjective(),
                            description: faker.faker.company.catchPhrase(),
                            location: faker.faker.address.cityName(),
                            image: faker.faker.image.abstract(),
                            startDate: moment(faker.faker.date.soon(5)).format("YYYY-MM-DD"),
                            endDate: moment(faker.faker.date.future()).format("YYYY-MM-DD"),
                            projectOwnerID: result,
                        });
            
                        projectDetails.save(function (err) {
                            if (err) throw err;
                            res.redirect("/admin/projects");
                        });
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
        try{ 
            await Project.collection.drop()
        } catch (err) {
            console.log(error.message)
        }
        console.log("Successful deletion");
        res.redirect("/admin/projects");
    },

    deleteUProject: async function (req, res) {
        try {
          await Project.findByIdAndRemove(req.params.id);
        } catch (err) {
            console.log(error.message)
        }
        console.log("Successful deletion");
        res.redirect("/admin/projects");
      },
}