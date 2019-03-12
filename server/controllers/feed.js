const Order = require('../models/Order');

module.exports = {
  getOrders: (req, res) => {
    Order.find()
      .then((orders) => {
        res
          .status(200)
          .json({ message: 'Fetched orders successfully.', orders });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },
  createOrder: (req, res) => {
    const orderObj = req.body;
    Order.create(orderObj)
    .then((order) => {
      res.status(200)
        .json({
          message: 'Order created successfully!',
          order
        })
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
  }
}