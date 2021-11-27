import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/index.css";
import "./style/smallComponents.css";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

var socket = io();

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket}></App>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
