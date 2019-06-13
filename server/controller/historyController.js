module.exports = {
  getUserHistory: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    db.get_user_history(user_id)
      .then(hist => {
        console.log(hist);
        if (hist.length) {
          res.status(200).send(hist);
        } else {
          res
            .status(404)
            .send(
              "OH NO! It appears as though you don't have any history to view"
            );
        }
      })
      .catch(err => console.log(err));
  },
  saveStory: (req, res, next) => {
    const db = req.app.get("db");
    const { title, share, story } = req.body;
    console.log("Session:", req.session);
    const { user_id } = req.session.user;
    db.save_to_history([user_id, title, story, share])
      .then(saved => res.status(200).send(saved))
      .catch(err => console.log(err));
  },
  sortTitle: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
    db.sort_by_title();
  },
  sortDate: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
    db.sort_by_date();
  }
};
