const LocalStrategy = require("passport-local").Strategy;
const { ObjectId } = require("bson");
const passport = require("passport");
const crypto = require("crypto");
module.exports = function (app, db, message) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      var collection = db.getDB().collection("users");
      collection.findOne({ username: username }, (err, user) => {
        if (user) {
          const hash = crypto
            .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
            .toString("hex");
          if (user.hash === hash) done(null, user);
          else {
            done(new Error("Invalid Password"));
          }
        } else {
          if (password.length >= 8) {
            var salt = crypto.randomBytes(16).toString("hex");
            var hash = crypto
              .pbkdf2Sync(password, salt, 10000, 512, "sha512")
              .toString("hex");
            collection.insertOne(
              { username: username, hash: hash, salt: salt },
              (err) => {
                collection.findOne({ username: username }, (err, user) => {
                  db.getDB().collection("messages").insertOne({
                    username: username,
                    user_id: user._id,
                    message_threads: {},
                  });

                  return done(null, user);
                });
              }
            );
          } else {
            done(new Error("short password"));
          }
        }
      });
    })
  );
};
