import { useState } from "react";
import io from "socket.io-client";
import Layout from "./components/layout";
import Messages from "./components/messages";
import MessageThread from "./components/messageThread";
import UsersTaskBar from "./components/usersTaskbar";
import authSockets from "./socketOps/authSockets";
import chatSockets from "./socketOps/chatSockets";
export default function App() {
  const [messageThread, setMessageThread] = useState(JSON.stringify({}));
  const [currentExchangeTo, setCurrentExchangeTo] = useState(undefined);

  var socket = io();
  //socket.io stuff
  authSockets(socket);

  var messageThreadObj = JSON.parse(messageThread);
  console.log(currentExchangeTo);
  chatSockets(socket, messageThreadObj, setMessageThread);
  return (
    <>
      <Layout>
        <div className="container-fluid w-100 row">
          <UsersTaskBar
            messageThreadsObj={messageThreadObj}
            setCurrentExchangeTo={setCurrentExchangeTo}
          />

          <MessageThread
            currentExchangeTo={currentExchangeTo}
            messageThreadObj={messageThreadObj}
            socket={socket}
            setMessageThread={setMessageThread}
          />
        </div>
      </Layout>
    </>
  );
}
