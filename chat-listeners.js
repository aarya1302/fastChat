module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("whoami", (cb) => {
      cb(socket.request.user ? socket.request.user.username : "");
    });

    const session = socket.request.session;
    session.userID = socket.id;
    session.username = socket.auth.username;
    console.log(session);
    socket.emit("session", session);

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.auth.username,
      });
    }
    socket.broadcast.emit("users", users);

    socket.on("chat message", (msg, room) => {
      if (room !== "") {
        socket.to(room).emit("receive message", msg);
      } else {
        socket.broadcast.emit("receive message", msg);
      }
    });
  });
};
