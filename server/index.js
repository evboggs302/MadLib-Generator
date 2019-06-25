require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const nodemailer = require("nodemailer");
const massive = require("massive");
const session = require("express-session");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  EMAIL,
  EMAIL_PASSWORD,
  SECRET_KEY
} = process.env;
const stripe = require("stripe")(SECRET_KEY);
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
app.use(express.static(__dirname + "/../build"));

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
app.post("/api/shopping/cart/:id", addToCart);
app.put("/api/shoppingcart/:id", removeFromCart);
app.delete("/api/shop/cart/:id", deleteCart);

// SOCKET.IO community EndPoints
io.on("connection", socket => {
  console.log("socket hit");
  socket.on("get_comm", () => {
    const db = app.get("db");
    db.shared_community().then(data => {
      io.emit("shared_data", data);
    });
  });
  socket.on("disconnect", () => {
    console.log("DISCONNECTED");
  });
});

// NODEMAILER EndPoints
app.post("/api/send", (req, res, next) => {
  const { name, email, title, message } = req.body.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: `${EMAIL}`,
    to: `${email}`,
    subject: `${title} by ${name}`,
    text: `${message}`,
    replyTo: ``
  };
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error("there was an error: ", err);
    } else {
      console.log("here is the res: ", res);
    }
  });
});

// STRIPE EndPoints
app.use(require("body-parser").text());
app.post("/api/charge", async (req, res) => {
  console.log("Request:", req.body);
  try {
    const { token, final } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const charge = await stripe.charges.create({
      amount: final * 100,
      currency: "USD",
      customer: customer.id,
      receipt_email: token.email,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    });
    console.log("CHARGE:", { charge });
    console.log("CUSTOMER:", { customer });
  } catch {
    console.log("Sorry, Batman!");
  }
});

// Becasue of browser router, you need the below lines.
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"));
});

server.listen(SERVER_PORT, () =>
  console.log(`SERVER on 💩 port: ${SERVER_PORT}`)
);
