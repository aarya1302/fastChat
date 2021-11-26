//packages
const engine = require("consolidate");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env" });
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const http = require("http");

const app = express();
const db = require("./db");

//creating http server and socket.io server
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//importing routes and some functions
const authRoutes = require("./routes/authRoutes");
const authStrategy = require("./auth/passport-strategies/passport-local");
const {
  ensureAuthenticated,
  ensureNotAuthenticated,
} = require("./auth/authFunctions");
const { ObjectId } = require("bson");

//importing socket.io listeners
const chat_listeners = require("./chat-listeners");

//general middlewares
app.use(cors());
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//authentication middlewares
var sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://aaryabhorra:ab1302ls@cluster0.krijj.mongodb.net/fast-chat?retryWrites=true&w=majority",
  }),
  resave: false,
  saveUninitialized: true,

  cookie: { secure: false },
  key: "express.sid",
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  db.getDB()
    .collection("users")
    .findOne({ _id: new ObjectId(id) }, (err, doc) => {
      done(null, doc);
    });
});

//socket.io middlewares
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    socket.userID = socket.request.user._id;
    socket.auth = { username: socket.request.user.username };

    next();
  } else {
    next(new Error("unauthorized"));
  }
});

// socket.io connections

chat_listeners(io, db);

//engines
app.set("view engine", "pug");

app.get("/", ensureAuthenticated, (req, res) => {
  res.sendFile(process.cwd() + "/chat-app/build/index.html");
});

//serving files
app.use(express.static(process.cwd() + "/public/"));
app.use(express.static(process.cwd() + "/chat-app/build/"));

//routes

authRoutes(app, db, io); //login route

//auth strategy
authStrategy(app, db);

// connection
db.connect((err) => {
  server.listen(3000, function (req, res) {
    console.log("listening 3000");
  });
});
