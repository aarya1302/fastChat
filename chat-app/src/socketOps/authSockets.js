export default function authSockets(socket) {
  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
  });

  socket.on("session", (session) => {
    var sessionCookie = {
      sessionID: session.passport.user,
      userID: session.userID,
      username: session.username,
    };
    console.log(sessionCookie, "session cookie to create");

    var storedSessionCookie = JSON.parse(localStorage.getItem("sessionCookie"));
    console.log(storedSessionCookie, "storedSessionCookie");
    if (!storedSessionCookie) {
      localStorage.setItem("sessionCookie", JSON.stringify(sessionCookie));
      socket.userID = session.userID;
    } else {
      socket.userID = storedSessionCookie.userID;
    }
  });
}
