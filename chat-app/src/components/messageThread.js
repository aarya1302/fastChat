import sendIcon from "../icons/send.svg";

export default function MessageThread({
  messageThreadObj,
  currentExchangeTo,
  socket,
  setMessageThread,
}) {
  var handleSendMessage = (e) => {
    e.preventDefault();
    var input = document.getElementById("chat_box").value;
    if (input) {
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
  console.log("re rendering", currentExchangeTo, "current user");
  if (users.indexOf(currentExchangeTo)) {
    var graphicalMessageThread = users.map((user) => {
      if (user === currentExchangeTo) {
        var messages = messageThreadObj[user].map((msg) => {
          console.log(msg);
          if (msg.self) {
            return (
              <div dir="rtl" className="mb-2 float-left">
                <li className="message-box own-text-bubble ">{msg.text}</li>
              </div>
            );
          }
          return (
            <div className="mb-2 float-right">
              <li className="message-box recepient-text-bubble">{msg.text}</li>
            </div>
          );
        });
        return (
          <div>
            <h1>{user}</h1>
            {messages}
          </div>
        );
      }
    });
  } else {
    messageThreadObj[currentExchangeTo] = [];
    setMessageThread(JSON.stringify(messageThreadObj));
  }

  return (
    <div className="col-sm-9">
      <div className="form-group row container-fluid ">
        <ul className="">{graphicalMessageThread}</ul>
        <input
          type="text"
          className="col ml-1 input-style"
          id="chat_box"
          placeholder="message"
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-light round-button col-2"
        >
          <img src={sendIcon} />
        </button>
      </div>
    </div>
  );
}
