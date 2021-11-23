export default function webSockets(socket, messageThread, setMessageThread) {
  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
    });
    console.log(users);
  });

  socket.on("session", (session) => {
    var sessionCookie = {
      sessionID: session.passport.user,
      userID: session.userID,
      username: session.username,
    };
    console.log(sessionCookie);
    console.log(localStorage.getItem("sessionCookie"));
    var storedSessionCookie = JSON.parse(localStorage.getItem("sessionCookie"));
    console.log(storedSessionCookie);
    if (!storedSessionCookie) {
      localStorage.setItem("sessionCookie", JSON.stringify(sessionCookie));
    } else {
      socket.userID = storedSessionCookie.userID;
    }
  });
  socket.on("receive message", (message) => {
    var arr = messageThread;
    arr.push({ message, self: false });
    setMessageThread([...arr]);
    console.log(message);
  });
}
