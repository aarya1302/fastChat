const passport = require("passport");
const {
  ensureAuthenticated,
  ensureNotAuthenticated,
  authenticate,
} = require("../auth/authFunctions");

module.exports = (app, db, io) => {
  app.get("/login", ensureNotAuthenticated, (req, res) => {
    var message = req.query.message;
    var displayMessage = message ? true : false;
    res.render(process.cwd() + "/public/login.pug", {
      message,
      displayMessage,
    });
  });
  app.post("/submitlogin", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        if (err.message === "Invalid Password") {
          return res.redirect("/login?message=" + err.message);
        }
      }
      if (!user) {
        return res.redirect("/login");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/?username=" + user.username);
      });
    })(req, res, next);
  });
  app.get("/signout", ensureAuthenticated, (req, res) => {
    const socketId = req.session.socketId;
    if (socketId && io.of("/").sockets.get(socketId)) {
      io.of("/").sockets.get(socketId).disconnect(true);
    }
    req.logout();
    res.status(200).send({ message: "redirect" });
  });
};
