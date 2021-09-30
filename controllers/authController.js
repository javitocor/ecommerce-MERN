const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Role = require("../models/role");

exports.signup_post = (req, res) => {
  const customer = new Customer({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  customer.save((err, customer) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    } else {  
      res.json({ message: "User was registered successfully!" });
    }
  });
};

exports.login_post = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(404).json({ message: "Customer Not found." });
    }
    const passwordIsValid = customer.isValidPassword(req.body.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    const token = jwt.sign({ id: customer._id }, process.env.SECRETORKEY, {
      expiresIn: 631139040 // 20 years
    });

    const authorities = 'ROLE_' + customer.role.name;

    res.status(200).json({
      customer,
      role: authorities,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }  
};

exports.logout_get = (req, res) => {
  req.logout();
  res.json({message: 'Logged out succesfully!'});
};