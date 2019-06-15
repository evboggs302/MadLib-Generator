require("dotenv").config();
const express = require("express");
const app = express();

const io = require("socket.io")();
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
// const { getProfilePic } = require("./controller/apiController");
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

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

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

//

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

// community EndPoints
// app.get("/api/community", community);

// app.get('https://randomuser.me/api/portraits/med/lego/:id.jpg', profilePicToSession);
//  id = Math.floor(Math.random() * 10) + 1}.jpg

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

const port = 8000;
io.listen(port);
console.log(`SOCKET on port: ${port}`);

app.listen(SERVER_PORT, () => console.log(`SERVER on 💩 port: ${SERVER_PORT}`));
