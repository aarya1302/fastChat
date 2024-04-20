import { useEffect } from "react";
import sendIcon from "../icons/send.svg";
import chevronleft from "../icons/chevron-left.svg";
import camera from "../icons/camera.svg";
//message thread gui
export default function  MessageThread({
  messageThreadObj,
  currentExchangeTo,
  socket,
  setMessageThread,
  width,
  setCurrentExchangeTo,
}) {
  useEffect(() => {
    var elem = document.getElementById("messages-thread-box");
    elem.scrollTop = elem.scrollHeight;
  });

  var handleSendMessage = (e) => {
    e.preventDefault();
    var elem = document.getElementById("messages-thread-box");

    var input = document.getElementById("chat_box").value;
    if (input && currentExchangeTo) {
      socket.emit("chat message", input, currentExchangeTo);
      var message = { text: input, self: true };
      if (messageThreadObj[currentExchangeTo]) {
        messageThreadObj[currentExchangeTo].push(message);
      } else {
        messageThreadObj[currentExchangeTo] = [message];
        console.log(messageThreadObj);
      }
      setMessageThread(JSON.stringify(messageThreadObj));
      document.getElementById("chat_box").value = "";
    }
  };
  var users = Object.keys(messageThreadObj);

  if (currentExchangeTo) {
    if (users.indexOf(currentExchangeTo) !== -1) {
      var graphicalMessageThread = users.map((user) => {
        if (user === currentExchangeTo) {
          var messages = messageThreadObj[user].map((msg) => {
            if (msg.self) {
              return (
                <div
                  className="mb-2 "
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <li className="message-box own-text-bubble">{msg.text}</li>
                </div>
              );
            }
            return (
              <div className="mb-2">
                <li className="message-box recepient-text-bubble">
                  {msg.text}
                </li>
              </div>
            );
          });
          return <div>{messages}</div>;
        }
      });
    } else {
      messageThreadObj[currentExchangeTo] = [];
      setMessageThread(JSON.stringify(messageThreadObj));
    }
  }

  return (
    <div className="col-lg-9" style={{ padding: 0 }}>
      <div className="h-100 contain-messages">
        <div className="p-1 exchangeUsername">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {width < 950 && (
              <div
                style={{ paddingRight: 10 }}
                onClick={() => {
                  setCurrentExchangeTo(undefined);
                }}
              >
                <img src={chevronleft}></img>
              </div>
            )}

            <h4 style={{ paddingLeft: 10 }} className="text-muted text-center ">
              {currentExchangeTo}
            </h4>
          </div>
        </div>

        <div className="messages-thread-container" id="messages-thread-box">
          {users.length === 0 && (
            <div style={{ position: "absolute", top: "45%", left: "47%" }}>
              <h4>Enter Username and Text Someone!</h4>
              <div style={{ position: "relative", left: 120 }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    document.getElementById("username-search-box").select();
                  }}
                >
                  New Message
                </button>
              </div>
            </div>
          )}
          <ul className="">{graphicalMessageThread}</ul>
        </div>
        <form className="row message-form">
          <input
            type="text"
            className="col ml-1 input-style"
            id="chat_box"
            placeholder="message"
          />
          <div className="col-2 ">
            <button
              type="submit"
              onClick={handleSendMessage}
              className="btn btn-light round-button col w-100"
            >
              <img src={sendIcon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
