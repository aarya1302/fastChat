const LocalStrategy = require("passport-local").Strategy;
const { ObjectId } = require("bson");
const passport = require("passport");

module.exports = function (app, db, message) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      var collection = db.getDB().collection("users");
      collection.findOne({ username: username }, (err, user) => {
        if (user) {
          if (user.password === password) done(null, user);
          else {
            done(new Error("Invalid Password"));
          }
        } else {
          collection.insertOne(
            { username: username, password: password },
            (err) => {
              collection.findOne({ username: username }, (err, user) => {
              db.getDB().collection('messages').insertOne({username:username, user_id: user._id, message_threads: {}})

                return done(null, user);
              });
            }
          );
        }
      });
    })
  );
};
