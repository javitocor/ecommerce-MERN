var Customer = require('../models/customer');

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Customer.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(400).json({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    Customer.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (user) {
        res.status(400).json({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};