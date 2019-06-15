module.exports = {
  getAllItems: (req, res, next) => {
    const db = req.app.get("db");
    db.get_stock()
      .then(stock => {
        res.status(200).send(stock);
      })
      .catch(err => console.log(err));
  },
  getCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.get_cart(id)
      .then(cart => {
        res.status(200).send(cart);
      })
      .catch(err => console.log(err));
  },
  addToCart: (req, res, next) => {
    const { id } = req.params;
    const { image, name, price, quant } = req.body;
    const db = req.app.get("db");
    db.add_to_cart([id, image, name, price, quant])
      .then(cart => {
        res.status(200).send(cart);
      })
      .catch(err => console.log(err));
  },
  removeFromCart: (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const db = req.app.get("db");
    db.remove_from_cart([id, name])
      .then(cart => {
        res.status(200).send(cart);
      })
      .catch(err => console.log(err));
  },
  deleteCart: (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.delete_cart(id)
      .then(cart => {
        res.status(200).send(cart);
      })
      .catch(err => console.log(err));
  },
  updateQuant: (req, res, next) => {
    const db = req.app.get("db");
  }
};
