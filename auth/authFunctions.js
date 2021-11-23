const passport = require("passport");
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function ensureNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
function validatePassword(req, res, next) {}
const authenticateLocal = (req, res, next) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        console.log("here");
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res, next);
  });

module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated,
  authenticateLocal,
};
