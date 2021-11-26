export default function chatSockets(
  socket,
  messageThreadObj,
  setMessageThread
) {
  socket.on("receive message", (data) => {
    if (!messageThreadObj[data.from]) {
      messageThreadObj[data.from] = [data.message];
    } else {
      messageThreadObj[data.from].push(data.message);
    }
    setMessageThread(JSON.stringify(messageThreadObj));
  });
  socket.on("message threads", (messageThreads) => {
    setMessageThread(JSON.stringify(messageThreads));
  });
}
