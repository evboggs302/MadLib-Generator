module.exports = {
  getAllItems: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_stock(id)
      .then(stock => {
        res.status(200).send(stock);
      })
      .catch(err => console.log(err));
  },
  getCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_stock(id)
      .then(stock => {
        res.status(200).send(stock);
      })
      .catch(err => console.log(err));
  },
  addToCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
  },
  removeFromCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
  },
  deleteCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
  },
  updateQuant: (req, res, next) => {
    const db = req.app.get("db");
  }
};
