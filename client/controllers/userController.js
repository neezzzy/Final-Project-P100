const User = require("../models/userModel");
const axios = require("axios");
require("dotenv").config();

module.exports = {
  fetchUserProfile: async function (req, res) {
    let userAuth0 = req.oidc.user;
    try {
      const user = await User.findOne({ email: userAuth0.email });
      // get your bloody API key here https://api.orb-intelligence.com/docs/
      const response = await axios.get(
        `https://api.orb-intelligence.com/3/match/?api_key=${process.env.ORB_API_KEY}&name=${user.name}&country=${user.country}`
      );


      res.render("profile", {
        title: "Profile",
        isAuthenticated: req.isAuthenticated,
        user,
        data: response.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getProfileByID: async function (req, res) {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);
      res.render("profile-edit", {
        user,
        title: "Edit User",
        isAuthenticated: req.isAuthenticated,
      });
    } catch (error) {
      console.log(error);
    }
  },
  
  addProfile: async function (req, res){
    try {
      let userAuth0 = req.oidc.user;
      const userEmail = userAuth0.email;

      const newUser = new User({
        name: "test",
        email: userEmail
      });
     await newUser.save(function(err,room){
        const newUserId = room._id;
        res.redirect(`/profile-edit/${newUserId}`);
        });
      
    
    } catch (error) {

      console.log(error.message)
    }
  },
  
  editProfile: async function (req, res) {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        name: req.body.userName,
        country: req.body.userCountry,
        email: req.body.userEmail,
        image: req.body.userImage,
      });

      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  },
};


