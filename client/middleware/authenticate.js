module.exports = {
  isAuthenticated: function (req, res, next) {
    req.isAuthenticated = req.oidc.isAuthenticated();
    next();
  },
};
