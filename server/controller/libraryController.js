module.exports = {
  getFullLibrary: (req, res, next) => {
    // console.log("this is session:", req.session);
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.get_full_library(user_id)
      .then(library => {
        res.status(200).send(library);
      })
      .catch(err => console.log(err));
  },
  getRandom: (req, res, next) => {
    // console.log(req.req.params);
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_random(id)
      .then(rando => {
        res.status(200).send(rando[0]);
      })
      .catch(err => console.log(err));
  },
  getSingleTemplate: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_single(id)
      .then(single => {
        res.status(200).send(single[0]);
      })
      .catch(err => console.log(err));
  },
  saveTemplate: (req, res, next) => {
    const { user_id } = req.session.user;
    const { title, blanks, lines } = req.body;
    const db = req.app.get("db");
    db.save_new_template([user_id, title, blanks, lines])
      .then(() => {
        res
          .status(200)
          .send("Your Mad Lib template has been placed in your Library");
      })
      .catch(error => console.log(error));
  },
  deleteTemplate: (req, res, next) => {
    const { user } = req.params;
    const { story } = req.query;
    const db = req.app.get("db");
    db.delete_template([story, user])
      .then(library => {
        res.status(200).send(library);
      })
      .catch(err => console.log(err));
  }
};
