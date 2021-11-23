import axios from "axios";
import { BSONRegExp } from "bson";
import {
  InputGroup,
  FormControl,
  SplitButton,
  Dropdown,
} from "react-bootstrap";
import io from "socket.io-client";
import { useState } from "react";
import webSockets from "./sockets";
export default function App() {
  const [messageThread, setMessageThread] = useState([]);
  const [something, setSomething] = useState([]);
  var socket = io();
  //socket.io stuff
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

  var handleSendMessage = (e) => {
    e.preventDefault();
    var input = document.getElementById("chat_box").value;
    var room = document.getElementById("room-box").value;
    if (input) {
      socket.emit("chat message", input, room);
      var arr = messageThread;
      arr.push({ message: input, self: true });
      console.log(messageThread);
      setMessageThread([...arr]);
      document.getElementById("chat_box").value = "";
      document.getElementById("room-box").value = "";
    }
  };
  var graphicalMessageThread = messageThread.map((msg) => {
    if (msg.self) {
      return (
        <li>
          <strong>{msg.message}</strong>
        </li>
      );
    }
    return <li>{msg.message}</li>;
  });

  return (
    <div>
      <h1>Fast chat</h1>
      <ul>{graphicalMessageThread}</ul>

      <form>
        <input type="text" id="room-box" placeholder="room" />
        <input type="text" id="chat_box" placeholder="message" />
        <input type="submit" onClick={handleSendMessage} />
      </form>
      <br></br>
      <button
        onClick={async () => {
          var res = await axios.get("/signout");
          if (res.data.message === "redirect") {
            window.location = "/login";
          }
        }}
      >
        logout
      </button>
    </div>
  );
}
