module.exports = {
  getUserHistory: (req, res, next) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    db.get_user_history(user_id)
      .then(hist => {
        if (hist.length) {
          res.status(200).send(hist);
        } else {
          res
            .status(404)
            .send(`Nice try! You'll have to create stories first!`);
        }
      })
      .catch(err => console.log(err));
  },
  saveStory: (req, res, next) => {
    const db = req.app.get("db");
    const { title, share, story } = req.body;
    const { user_id } = req.session.user;
    db.save_to_history([user_id, title, story, share])
      .then(saved => res.status(200).send(saved))
      .catch(err => console.log(err));
  },
  toggleShare: (req, res, next) => {
    const db = req.app.get("db");
    const { hist_id } = req.body;
    const { user } = req.params;
    db.toggle_share([user, hist_id])
      .then(hist => {
        res.status(200).send(hist);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
  deleteFromHist: (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.delete_from_history(id)
      .then(newHist => {
        return res.status(200).send(newHist);
      })
      .catch(err => console.log(err));
  }
};
