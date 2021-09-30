const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Role = require("../models/role");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRETORKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.customerId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  Customer.findById(req.customerId).exec((err, customer) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    Role.findOne(
      {
        _id: customer.role 
      },
      (err, role) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }
        if (role.name === 'Admin') {
          next();
          return;
        }

        res.status(403).json({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

