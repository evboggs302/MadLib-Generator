module.exports = {
  getUserHistory: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
    db.get_user_history();
  },
  saveStory: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
    db.save_to_history();
  },
  sortTitle: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
  },
  sortDate: (req, res, next) => {
    const db = req.app.get("db");
    const {} = req.body;
    const { user_id } = req.session.user;
  }
};
