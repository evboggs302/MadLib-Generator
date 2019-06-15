const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  login: (req, res, next) => {
    const { username, password, picture } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(username).then(found => {
      if (!found[0]) {
        res.status(500).send("Incorrect username/password");
      } else {
        bcrypt.compare(password, found[0].password).then(matched => {
          if (matched) {
            const { username, email, user_id, call_name } = found[0];
            req.session.user = { username, email, user_id, call_name, picture };
            res.status(200).send(req.session.user);
          } else {
            res.status(500).send("Incorrect username/password");
          }
        });
      }
    });
  },
  register: (req, res, next) => {
    const { name, username, email, password } = req.body;
    const db = req.app.get("db");
    db.check_existing_users(username).then(found => {
      if (found.length) {
        res.status(500).send("Email already exists!");
      } else {
        bcrypt.genSalt(saltRounds).then(salt => {
          bcrypt.hash(password, salt).then(hashedPassword => {
            db.register([name, username, email, hashedPassword]).then(
              createdUser => {
                (req.session.user = createdUser[0]),
                  res.status(200).send(req.session.user);
              }
            );
          });
        });
      }
    });
  },
  userInfo: (req, res, next) => {
    res.status(200).send(req.session.user);
  },
  logout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send("logged out mofo");
  }
};
