module.exports = {
  getFullLibrary: (req, res, next) => {
    console.log("this is session:", req.session);
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    db.get_full_library(user_id)
      .then(library => {
        console.log(library);
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
        console.log(rando[0]);
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
    const {} = req.body;
    const db = req.app.get("db");
    db.save_new_template();
  },
  deleteTemplate: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  }
};
