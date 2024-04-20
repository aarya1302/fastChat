import { useState } from "react";
import chatSockets from "../socketOps/chatSockets";
import MessageThread from "./messageThread";

export default function Messages({ socket }) {
  const [messageThread, setMessageThread] = useState(JSON.stringify({}));
  const [currentThread, setCurrentThread] = useState([]);

  var messageThreadObj = JSON.parse(messageThread);
  chatSockets(socket, messageThreadObj, setMessageThread);

  return (
    <>
      <MessageThread
        currentThread={currentThread}
        socket={socket}
        setCurrentThread={setCurrentThread}
      />
    </>
  );
}
