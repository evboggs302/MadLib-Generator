require("dotenv").config();
const express = require("express");
const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const massive = require("massive");
const session = require("express-session");
app.use(express.json());
// app.use(express.static(__dirname + "/../build"));
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

// templates EndPoints

//

// Becasue of browser router, you need the below lines.
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../build/index.html"));
// });

app.listen(SERVER_PORT, () =>
  console.log(`listening on 💩  port: ${SERVER_PORT}`)
);
