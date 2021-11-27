import { use } from "passport";
import { useEffect, useState } from "react";
import Layout from "./components/layout";
import Messages from "./components/messages";
import MessageThread from "./components/messageThread";
import UsersTaskBar from "./components/usersTaskbar";
import authSockets from "./socketOps/authSockets";
import chatSockets from "./socketOps/chatSockets";

export default function App({ socket }) {
  const [messageThread, setMessageThread] = useState(JSON.stringify({}));
  const [currentExchangeTo, setCurrentExchangeTo] = useState(undefined);
  const [width, setWidth] = useState(window.innerWidth);
  //socket.io stuff
  authSockets(socket);

  var messageThreadObj = JSON.parse(messageThread);

  chatSockets(socket, messageThreadObj, setMessageThread);

  useEffect(() => {
    window.addEventListener("resize", () => {
      var currentWidth = window.innerWidth;
      setWidth(currentWidth);
    });
  });

  return (
    <>
      <Layout>
        <div className="container-fluid w-100 row">
          <UsersTaskBar
            currentExchangeTo={currentExchangeTo}
            messageThreadsObj={messageThreadObj}
            setCurrentExchangeTo={setCurrentExchangeTo}
          />
          {width > 900 && (
            <MessageThread
              currentExchangeTo={currentExchangeTo}
              messageThreadObj={messageThreadObj}
              socket={socket}
              setMessageThread={setMessageThread}
            />
          )}
        </div>
      </Layout>
    </>
  );
}
