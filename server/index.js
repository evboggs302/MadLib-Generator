require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const massive = require("massive");
const session = require("express-session");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const {
  login,
  register,
  userInfo,
  logout
} = require("./controller/authController");
const {
  getUserHistory,
  saveStory,
  toggleShare,
  deleteFromHist
} = require("./controller/historyController");
const {
  getRandom,
  getFullLibrary,
  getSingleTemplate,
  saveTemplate,
  deleteTemplate
} = require("./controller/libraryController");
const {
  getAllItems,
  getCart,
  addToCart,
  removeFromCart,
  deleteCart,
  updateQuant
} = require("./controller/shopController");

app.use(express.json());
// app.use(express.static(__dirname + "/../build"));

//
app.use(
  session({
    saveUninitialized: false,
    secret: SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // 2week cookie
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected");
});

// auth EndPoints
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/user", userInfo);
app.get("/api/logout", logout);

// history EndPoints
app.get("/api/history", getUserHistory);
app.post("/api/history", saveStory);
app.put("/api/history/toggleshare/:user", toggleShare);
app.delete("/api/history/:id", deleteFromHist);

// library EndPoints
app.get("/api/library", getFullLibrary);
app.get("/api/library/random/:id", getRandom);
app.get("/api/library/single/:id", getSingleTemplate);
app.post("/api/library", saveTemplate);
app.delete("/api/library/:user", deleteTemplate);

// shop EndPoints
app.get("/api/shop", getAllItems);
app.get("/api/shoppingcart/:id", getCart);
app.put("/api/shop/:prod_id", updateQuant); // on checkout
app.post("/api/shopping/cart/:id", addToCart);
app.put("/api/shoppingcart/:id", removeFromCart);
app.delete("/api/shop/cart/:id", deleteCart);

// SOCKET.IO community EndPoints
io.on("connection", socket => {
  console.log("socket hit", socket.id);
  socket.on("get comm", () => {
    const db = app.get("db");
    db.get_all_community().then(data => {
      console.log("response form DB:", data);
      io.emit("shared data", data);
    });
  });
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

server.listen(SERVER_PORT, () =>
  console.log(`SERVER on 💩 port: ${SERVER_PORT}`)
);
