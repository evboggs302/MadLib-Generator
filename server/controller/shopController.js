module.exports = {
  getAllItems: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  },
  updateQuant: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  }
};
