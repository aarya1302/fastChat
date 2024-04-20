const { ObjectId } = require("bson");
const OnlineUsersStore = require("./storage/onlineUsersStorage");

module.exports = (io, db) => {
  io.on("connection", (socket) => {
    socket.on("whoami", (cb) => {
      cb(socket.request.user ? socket.request.user.username : "");
    });

    var socket_user = socket.request.user;

    var messages_collection = db.getDB().collection("messages");

    messages_collection.findOne({ user_id: socket_user._id }, (err, doc) => {
      socket.emit("message threads", doc["message_threads"]);
    });

    OnlineUsersStore[socket_user.username] = {
      socketId: socket.id,
      userId: socket_user._id,
    };

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.auth.username,
      });
    }

    socket.emit("users", users);

    var updateArrayInMessageThreads = (doc, username, msg, self_sent) => {
      var obj = doc["message_threads"];
      var message = { text: msg, self: self_sent };
      if (obj.hasOwnProperty(username)) {
        obj[username].push(message);
      } else {
        obj[username] = [message];
      }
      return obj;
    };

    socket.on("chat message", (msg, username) => {
      messages_collection.findOne({ user_id: socket_user._id }, (err, doc) => {
        var obj = updateArrayInMessageThreads(doc, username, msg, true);
        messages_collection.updateOne(
          { username: socket_user.username },
          { $set: { message_threads: obj } },
          (err) => {
            messages_collection.findOne({ username: username }, (err, doc) => {
              var update_obj = updateArrayInMessageThreads(
                doc,
                socket_user.username,
                msg,
                false
              );

              messages_collection.updateOne(
                { username: username },
                { $set: { message_threads: update_obj } }
              );
            });
          }
        );
      });
      var userOnline = OnlineUsersStore[username];
      if (userOnline) {
        socket
          .to(OnlineUsersStore[username]["socketId"])
          .emit("receive message", {
            from: socket_user.username,
            message: { text: msg, self: false },
          });
      }
    });
  });
};
