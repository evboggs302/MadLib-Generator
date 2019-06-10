module.exports = {
  saveStory: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  },
  sortTitle: (res, req, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  },
  sortDate: (res, req, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  }
};
