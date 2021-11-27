import { useEffect } from "react";
import sendIcon from "../icons/send.svg";
export default function MessageThread({
  messageThreadObj,
  currentExchangeTo,
  socket,
  setMessageThread,
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
                  style={{ display: "flex", justifyContent: "right" }}
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
    <div className="col-md-9" style={{ padding: 0 }}>
      <div className="h-100 contain-messages">
        <div
          className="p-3"
          style={{
            background: "rgb(236, 236, 236)",
            borderRadius: "0px 15px 0px 0px",
          }}
        >
          <h4 className="text-muted text-center">{currentExchangeTo}</h4>
        </div>

        <div className="messages-thread-container" id="messages-thread-box">
          <ul className="">{graphicalMessageThread}</ul>
        </div>
        <form className="row message-form">
          <input
            type="text"
            className="col ml-1 input-style"
            id="chat_box"
            placeholder="message"
          />
          <button
            type="submit"
            onClick={handleSendMessage}
            className="btn btn-light round-button col-2"
          >
            <img src={sendIcon} />
          </button>
        </form>
      </div>
    </div>
  );
}
