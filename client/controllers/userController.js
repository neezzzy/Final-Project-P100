const User = require("../models/userModel");
const axios = require("axios");

module.exports = {
  fetchUserProfile: async function (req, res) {
    let userAuth0 = req.oidc.user;
    try {
      const user = await User.findOne({ email: userAuth0.email });
      const response = await axios.get(
        `https://api.orb-intelligence.com/3/match/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a&name=${user.name}&country=${user.country}`
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
};
