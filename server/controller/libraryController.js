module.exports = {
  getFullLibrary: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
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
    const {} = req.body;
    const db = req.app.get("db");
  },
  saveTemplate: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  },
  deleteTemplate: (req, res, next) => {
    const {} = req.body;
    const db = req.app.get("db");
  }
};
